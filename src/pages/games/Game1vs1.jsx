import { useState, useRef } from "react";
import { BoardRow } from "./BoardRow";
import { HomeStore } from "./HomeStore";
import { PlayerInfo } from "./PlayerInfo";
import { SoalModal } from "./SoalModal";
import { getRandomSoal, submitAnswer, finishGame } from "../../api/apiSoal";
import Swal from "sweetalert2";
import SoundControl from "../../components/Sound";
import toast from "react-hot-toast";

const generateGameId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `gm${randomPart}`;
};

const initialBiji = 5;
const maxGiliran = 14;

export default function GamePage1v1() {
  const [player1, setPlayer1] = useState(Array(7).fill(initialBiji));
  const [player2, setPlayer2] = useState(Array(7).fill(initialBiji));
  const [gudang1, setGudang1] = useState(0);
  const [gudang2, setGudang2] = useState(0);
  const [nilai1, setNilai1] = useState(0);
  const [nilai2, setNilai2] = useState(0);
  const [currentTurn, setCurrentTurn] = useState("player1");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentSoal, setCurrentSoal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameSesion, setGameSesion] = useState(generateGameId());

  const [soalPlayer1, setSoalPlayer1] = useState([]);
  const [soalPlayer2, setSoalPlayer2] = useState([]);
  const [giliran1, setGiliran1] = useState(0);
  const [giliran2, setGiliran2] = useState(0);

  const klikSoal = useRef(new Audio("/sound/klik-soal.mp3"));
  const gantiTurn = useRef(new Audio("/sound/turn.mp3"));
  const victory = useRef(new Audio("/sound/victory.mp3"));
  const resetGame = () => window.location.reload();

  const handlePilihLubang = async (index) => {
    const currentPlayer = currentTurn;
    const lubang = currentPlayer === "player1" ? player1 : player2;
    if (lubang[index] === 0 || gameOver) return;

    klikSoal.current.play();

    const sudah = currentPlayer === "player1" ? soalPlayer1 : soalPlayer2;
    let soal;
    do {
      soal = await getRandomSoal();
    } while (sudah.includes(soal.id));

    if (currentPlayer === "player1") {
      setSoalPlayer1((prev) => [...prev, soal.id]);
    } else {
      setSoalPlayer2((prev) => [...prev, soal.id]);
    }

    setSelectedIndex(index);
    setCurrentSoal(soal);
    setModalOpen(true);
  };

  const handleJawab = async (jawaban) => {
    const isCorrect = jawaban === currentSoal.jawaban_benar;
    const nilai = isCorrect ? currentSoal.nilai : 0;
    const isPlayer1 = currentTurn === "player1";

    // Update nilai dan giliran
    if (isPlayer1) {
      setNilai1((prev) => prev + nilai);
      setGiliran1((prev) => prev + 1);
    } else {
      setNilai2((prev) => prev + nilai);
      setGiliran2((prev) => prev + 1);
    }

    try {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(atob(token.split(".")[1])).id;

      await submitAnswer({
        gameId: gameSesion,
        userId,
        questionId: currentSoal.id,
        jawaban,
        isCorrect,
        namaPemain: currentTurn,
      });
    } catch (error) {
      console.error("❌ Gagal submit jawaban ke server:", error);
    }

    setModalOpen(false);
    jalankanLangkah(currentTurn, selectedIndex, nilai);
  };

  const jalankanLangkah = (pemain, index) => {
    let lubang1 = [...player1];
    let lubang2 = [...player2];
    let gudang1Temp = gudang1;
    let gudang2Temp = gudang2;

    let biji = pemain === "player1" ? lubang1[index] : lubang2[index];
    pemain === "player1" ? (lubang1[index] = 0) : (lubang2[index] = 0);

    let route = [];

    if (pemain === "player1") {
      for (let i = index + 1; i < 7; i++)
        route.push({ sisi: "player1", index: i });
      route.push({ sisi: "gudang", pemain: "player1" });
      for (let i = 6; i >= 0; i--) route.push({ sisi: "player2", index: i });
    } else {
      for (let i = index - 1; i >= 0; i--)
        route.push({ sisi: "player2", index: i });
      route.push({ sisi: "gudang", pemain: "player2" });
      for (let i = 0; i < 7; i++) route.push({ sisi: "player1", index: i });
    }

    let pos = 0;
    let posisiTerakhir = null;

    while (biji > 0) {
      const current = route[pos % route.length];
      if (current.sisi === "gudang" && current.pemain !== pemain) {
        pos++;
        continue;
      }

      if (current.sisi === "player1") lubang1[current.index]++;
      else if (current.sisi === "player2") lubang2[current.index]++;
      else if (current.sisi === "gudang") {
        pemain === "player1" ? gudang1Temp++ : gudang2Temp++;
      }

      posisiTerakhir = current;
      pos++;
      biji--;
    }

    setPlayer1(lubang1);
    setPlayer2(lubang2);
    setGudang1(gudang1Temp);
    setGudang2(gudang2Temp);

    const player1Done = pemain === "player1" && giliran1 + 1 >= maxGiliran;
    const player2Done = pemain === "player2" && giliran2 + 1 >= maxGiliran;

    if (player1Done || player2Done) {
      return endGame(gudang1Temp, gudang2Temp);
    }

    if (posisiTerakhir?.sisi === "gudang" && posisiTerakhir.pemain === pemain) {
      setCurrentTurn(pemain);
      return;
    }

    setCurrentTurn(pemain === "player1" ? "player2" : "player1");
    gantiTurn.current.play();
  };
  const endGame = async (g1, g2) => {
    setGameOver(true);
    victory.current.play();

    try {
      const hasilPemain = [
        {
          namaPemain: "player1",
          total_nilai: nilai1,
          skorLumbung: g1,
        },
        {
          namaPemain: "player2",
          total_nilai: nilai2,
          skorLumbung: g2,
        },
      ];

      for (const pemain of hasilPemain) {
        await finishGame({
          gameId: gameSesion,
          ...pemain,
        });
      }
    } catch (error) {
      console.error(
        "Gagal simpan salah satu skor:",
        error.response?.data || error.message
      );
      toast.error("Gagal simpan skor");
    }

    Swal.fire({
      title: "Permainan Selesai!",
      html: `
    <p>Skor Lumbung: Player 1 = <b>${g1}</b> | Player 2 = <b>${g2}</b></p>
    <p>Bonus Nilai: Player 1 = <b>${nilai1}</b> | Player 2 = <b>${nilai2}</b></p>
    <hr />
    <p><b>${
      g1 > g2
        ? "🎉 Player 1 Menang!"
        : g2 > g1
        ? "🎉 Player 2 Menang!"
        : "🤝 Seri!"
    }</b></p>`,
      confirmButtonText: "Main Lagi",
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded focus:outline-none",
      },
      buttonsStyling: false,
    }).then(resetGame);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SoundControl />
      <PlayerInfo
        name="Player 2"
        skorLumbung={gudang2}
        skorNilai={nilai2}
        turn={currentTurn === "player2"}
      />
      <BoardRow
        lubang={player2}
        onClick={(i) => currentTurn === "player2" && handlePilihLubang(i)}
        disabled={currentTurn !== "player2" || gameOver}
      />
      <div className="flex justify-between my-4">
        <HomeStore jumlah={gudang2} />
        <HomeStore jumlah={gudang1} />
      </div>
      <BoardRow
        lubang={player1}
        onClick={(i) => currentTurn === "player1" && handlePilihLubang(i)}
        disabled={currentTurn !== "player1" || gameOver}
      />
      <PlayerInfo
        name="Player 1"
        skorLumbung={gudang1}
        skorNilai={nilai1}
        turn={currentTurn === "player1"}
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
