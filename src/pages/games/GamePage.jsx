import { useEffect, useState, useRef } from "react";
import { BoardRow } from "./BoardRow";
import { HomeStore } from "./HomeStore";
import { PlayerInfo } from "./PlayerInfo";
import { SoalModal } from "./SoalModal";
import { getRandomSoal, finishGame } from "../../api/apiSoal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import SoundControl from "../../components/Sound";

const useAudio = (url) => {
  const audio = useRef(new Audio(url));
  audio.current.preload = "auto";
  return audio;
};
const initialBiji = 5;

export default function GamePage() {
  const [playerLubang, setPlayerLubang] = useState(Array(7).fill(initialBiji));
  const [komputerLubang, setKomputerLubang] = useState(
    Array(7).fill(initialBiji)
  );
  const [playerGudang, setPlayerGudang] = useState(0);
  const [komputerGudang, setKomputerGudang] = useState(0);
  const [playerNilai, setPlayerNilai] = useState(0);
  const [komputerNilai, setKomputerNilai] = useState(0);

  const [currentTurn, setCurrentTurn] = useState("player");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentSoal, setCurrentSoal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const klikSoal = useAudio("/public/sound/klik-soal.mp3");
  const gantiTurn = useAudio("/public/sound/turn.mp3");
  const victory = useAudio("/public/sound/victory.mp3");

  const resetGame = () => {
    setPlayerLubang(Array(7).fill(initialBiji));
    setKomputerLubang(Array(7).fill(initialBiji));
    setPlayerGudang(0);
    setKomputerGudang(0);
    setPlayerNilai(0);
    setKomputerNilai(0);
    setGameOver(false);
    setCurrentTurn("player");
  };

  const handlePilihLubang = async (index) => {
    if (currentTurn !== "player" || playerLubang[index] === 0 || gameOver)
      return;
    klikSoal.current.play();
    setSelectedIndex(index);
    const soal = await getRandomSoal();
    setCurrentSoal(soal);
    setModalOpen(true);
  };

  const handleJawab = (jawaban) => {
    const benar = jawaban === currentSoal.jawaban_benar;
    const nilai = benar ? currentSoal.nilai : 0;

    if (benar) {
      setPlayerNilai((prev) => prev + nilai);
    }

    setModalOpen(false);
    jalankanLangkah("player", selectedIndex);
  };
  const jalankanLangkah = (pemain, index, nilaiSoal = 0) => {
    let lubangP = [...playerLubang];
    let lubangK = [...komputerLubang];
    let gudangP = playerGudang;
    let gudangK = komputerGudang;

    let biji;
    let route = [];

    if (pemain === "player") {
      biji = lubangP[index];
      lubangP[index] = 0;
      for (let i = index + 1; i < 7; i++)
        route.push({ sisi: "player", index: i });
      route.push({ sisi: "gudang", pemain: "player" });
      for (let i = 6; i >= 0; i--) route.push({ sisi: "komputer", index: i });
    } else {
      biji = lubangK[index];
      lubangK[index] = 0;
      for (let i = index - 1; i >= 0; i--)
        route.push({ sisi: "komputer", index: i });
      route.push({ sisi: "gudang", pemain: "komputer" });
      for (let i = 0; i < 7; i++) route.push({ sisi: "player", index: i });
    }

    let pos = 0;
    let posisiTerakhir = null;

    while (biji > 0) {
      const current = route[pos % route.length];

      if (current.sisi === "gudang" && current.pemain !== pemain) {
        pos++;
        continue;
      }

      if (current.sisi === "player") lubangP[current.index]++;
      else if (current.sisi === "komputer") lubangK[current.index]++;
      else if (current.sisi === "gudang" && current.pemain === pemain) {
        if (pemain === "player") gudangP++;
        else gudangK++;
      }

      posisiTerakhir = current;
      pos++;
      biji--;
    }

    if (pemain === "player") {
      setPlayerNilai((prev) => prev + nilaiSoal);
    } else {
      setKomputerNilai((prev) => prev + nilaiSoal);
    }

    setPlayerLubang(lubangP);
    setKomputerLubang(lubangK);
    setPlayerGudang(gudangP);
    setKomputerGudang(gudangK);

    const semuaKosongP = lubangP.every((val) => val === 0);
    const semuaKosongK = lubangK.every((val) => val === 0);

    if (semuaKosongP && semuaKosongK) {
      const sisaP = lubangP.reduce((a, b) => a + b, 0);
      const sisaK = lubangK.reduce((a, b) => a + b, 0);

      gudangP += sisaP;
      gudangK += sisaK;

      setPlayerLubang(Array(7).fill(0));
      setKomputerLubang(Array(7).fill(0));
      setPlayerGudang(gudangP);
      setKomputerGudang(gudangK);
      setGameOver(true);

      const simpanSkor = async () => {
        try {
          await finishGame({ total_nilai: playerNilai });
          victory.current.play();
          toast.success("Skor berhasil disimpan!");
        } catch (error) {
          console.error("Gagal menyimpan skor:", error);
          toast.error("Gagal menyimpan skor ke server.");
        }
      };

      simpanSkor();

      setTimeout(() => {
        const hasil =
          gudangP > gudangK
            ? "🎉 Kamu Menang!"
            : gudangK > gudangP
            ? "💻 Komputer Menang!"
            : "🤝 Seri!";

        Swal.fire({
          title: "Permainan Selesai!",
          icon: "info",
          html: `
        <div class="text-left">
          <p class="font-semibold">🔹 Skor Lumbung:</p>
          <p>Kamu: <b>${gudangP}</b> &nbsp; | &nbsp; Komputer: <b>${gudangK}</b></p>

          <p class="mt-2 font-semibold">🧠 Skor Bonus Nilai (dari soal):</p>
          <p>Kamu: <b>${playerNilai}</b> &nbsp; | &nbsp; Komputer: <b>${komputerNilai}</b></p>

          <hr class="my-2" />
          <p class="text-lg font-bold">${hasil}</p>
        </div>
      `,
          confirmButtonText: "Main Lagi",
          customClass: {
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded focus:outline-none",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          }
        });
      }, 500);
    } else {
      let nextTurn = pemain === "player" ? "komputer" : "player";
      if (
        posisiTerakhir?.sisi === "gudang" &&
        posisiTerakhir.pemain === pemain
      ) {
        nextTurn = pemain;
      }
      if (
        posisiTerakhir?.sisi === pemain &&
        ((pemain === "player" && lubangP[posisiTerakhir.index] === 1) ||
          (pemain === "komputer" && lubangK[posisiTerakhir.index] === 1))
      ) {
        nextTurn = pemain === "player" ? "komputer" : "player";
      }
      gantiTurn.current.play();
      setCurrentTurn(nextTurn);
    }
  };

  useEffect(() => {
    if (gameOver) return;

    if (currentTurn === "player") {
      const bisaJalan = playerLubang.some((val) => val > 0);
      if (!bisaJalan) {
        setTimeout(() => setCurrentTurn("komputer"), 1000);
      }
      return;
    }

    if (currentTurn === "komputer") {
      const bisaJalan = komputerLubang.some((val) => val > 0);
      if (!bisaJalan) {
        setTimeout(() => setCurrentTurn("player"), 1000);
        return;
      }

      const timer = setTimeout(async () => {
        const indeksAktif = komputerLubang
          .map((val, i) => (val > 0 ? i : null))
          .filter((v) => v !== null);

        const acak =
          indeksAktif[Math.floor(Math.random() * indeksAktif.length)];
        const soal = await getRandomSoal();
        const benar = Math.random() < 0.7;
        const nilai = benar ? soal.nilai : 0;

        jalankanLangkah("komputer", acak, nilai);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentTurn, playerLubang, komputerLubang, gameOver]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SoundControl />
      <PlayerInfo
        name="Komputer"
        skorLumbung={komputerGudang}
        skorNilai={komputerNilai}
        turn={currentTurn === "komputer"}
      />
      <BoardRow
        lubang={[...komputerLubang]}
        disabled={true}
        onClick={() => {}}
      />
      <div className="flex justify-between items-center my-4">
        <HomeStore jumlah={komputerGudang} />
        <HomeStore jumlah={playerGudang} />
      </div>
      <BoardRow
        lubang={[...playerLubang]}
        onClick={handlePilihLubang}
        disabled={currentTurn !== "player" || gameOver}
      />
      <PlayerInfo
        name="Kamu"
        skorLumbung={playerGudang}
        skorNilai={playerNilai}
        turn={currentTurn === "player"}
      />
      <SoalModal
        show={modalOpen}
        soal={currentSoal}
        onJawab={handleJawab}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
