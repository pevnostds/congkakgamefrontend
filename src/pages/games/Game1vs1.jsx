import { useState, useEffect } from "react";
import { BoardRow } from "./BoardRow";
import { HomeStore } from "./HomeStore";
import { PlayerInfo } from "./PlayerInfo";
import { SoalModal } from "./SoalModal";
import { getRandomSoal } from "../../api/apiSoal";
import Swal from "sweetalert2";
import { StartScreen } from "./StartScreen";

const initialBiji = 1;

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

  const resetGame = () => {
    setPlayer1(Array(7).fill(initialBiji));
    setPlayer2(Array(7).fill(initialBiji));
    setGudang1(0);
    setGudang2(0);
    setNilai1(0);
    setNilai2(0);
    setGameOver(false);
    setCurrentTurn("player1");
  };

  const handlePilihLubang = async (index) => {
    const isCurrentPlayer1 = currentTurn === "player1";
    const lubang = isCurrentPlayer1 ? player1 : player2;
    if (lubang[index] === 0 || gameOver) return;

    setSelectedIndex(index);
    const soal = await getRandomSoal();
    setCurrentSoal(soal);
    setModalOpen(true);
  };

  const handleJawab = (jawaban) => {
    const benar = jawaban === currentSoal.jawaban_benar;
    const nilai = benar ? currentSoal.nilai : 0;

    if (currentTurn === "player1") {
      setNilai1((prev) => prev + nilai);
    } else {
      setNilai2((prev) => prev + nilai);
    }

    setModalOpen(false);
    jalankanLangkah(currentTurn, selectedIndex, nilai);
  };

  const jalankanLangkah = (pemain, index, nilaiSoal = 0) => {
    let lubang1 = [...player1];
    let lubang2 = [...player2];
    let gudang1Temp = gudang1;
    let gudang2Temp = gudang2;

    let biji;
    let route = [];

    if (pemain === "player1") {
      biji = lubang1[index];
      lubang1[index] = 0;
      for (let i = index + 1; i < 7; i++)
        route.push({ sisi: "player1", index: i });
    route.push({ sisi: "gudang", pemain: "player1" });
    for (let i = 6; i >= 0; i--) route.push({ sisi: "player2", index: i });
} else {
    biji = lubang2[index];
    lubang2[index] = 0;
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
        if (pemain === "player1") gudang1Temp++;
        else gudang2Temp++;
      }

      posisiTerakhir = current;
      pos++;
      biji--;
    }

    if (pemain === "player1") setNilai1((prev) => prev + nilaiSoal);
    else setNilai2((prev) => prev + nilaiSoal);

    // Update state papan
    setPlayer1(lubang1);
    setPlayer2(lubang2);
    setGudang1(gudang1Temp);
    setGudang2(gudang2Temp);

    // Cek kondisi game over
    const semuaKosong1 = lubang1.every((val) => val === 0);
    const semuaKosong2 = lubang2.every((val) => val === 0);

    if (semuaKosong1 && semuaKosong2) {
      const sisa1 = lubang1.reduce((a, b) => a + b, 0);
      const sisa2 = lubang2.reduce((a, b) => a + b, 0);
      gudang1Temp += sisa1;
      gudang2Temp += sisa2;

      setPlayer1(Array(7).fill(0));
      setPlayer2(Array(7).fill(0));
      setGudang1(gudang1Temp);
      setGudang2(gudang2Temp);
      setGameOver(true);

      Swal.fire({
        title: "Permainan Selesai!",
        icon: "info",
        html: `
        <p>Skor Lumbung: Player 1 = <b>${gudang1Temp}</b> | Player 2 = <b>${gudang2Temp}</b></p>
        <p>Bonus Nilai Soal: Player 1 = <b>${nilai1}</b> | Player 2 = <b>${nilai2}</b></p>
        <hr />
        <p><b>${
          gudang1Temp > gudang2Temp
            ? "🎉 Player 1 Menang!"
            : gudang2Temp > gudang1Temp
            ? "🎉 Player 2 Menang!"
            : "🤝 Seri!"
        }</b></p>`,
        confirmButtonText: "Main Lagi",
        customClass: {
          confirmButton:
            "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded focus:outline-none",
        },
        buttonsStyling: false,
      }).then(() => resetGame());

      return;
    }

    // Tentukan giliran selanjutnya
    let nextTurn = pemain === "player1" ? "player2" : "player1";

    // Tetap jalan jika berhenti di gudang sendiri
    if (posisiTerakhir?.sisi === "gudang" && posisiTerakhir.pemain === pemain) {
      nextTurn = pemain;
    }

    // Ganti giliran jika berhenti di lubang kosong milik sendiri
    if (
      posisiTerakhir?.sisi === pemain &&
      ((pemain === "player1" && lubang1[posisiTerakhir.index] === 1) ||
        (pemain === "player2" && lubang2[posisiTerakhir.index] === 1))
    ) {
      nextTurn = pemain === "player1" ? "player2" : "player1";
    }

    // Cek jika nextTurn tidak bisa jalan → skip balik ke pemain awal
    const nextLubang = nextTurn === "player1" ? lubang1 : lubang2;
    if (nextLubang.every((val) => val === 0)) {
      nextTurn = pemain;
    }

    setCurrentTurn(nextTurn);
  };

  useEffect(() => {
    if (gameOver) return;

    const lubangSekarang = currentTurn === "player1" ? player1 : player2;

    const bisaJalan = lubangSekarang.some((val) => val > 0);
    if (!bisaJalan) {
      const next = currentTurn === "player1" ? "player2" : "player1";
      setTimeout(() => setCurrentTurn(next), 1000);
    }
  }, [currentTurn, player1, player2, gameOver]);



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PlayerInfo
        name="Player 2"
        skorLumbung={gudang2}
        skorNilai={nilai2}
        turn={currentTurn === "player2"}
      />
      <BoardRow
        lubang={[...player2]}
        onClick={(i) => {
          if (currentTurn === "player2") handlePilihLubang(i);
        }}
        disabled={currentTurn !== "player2" || gameOver}
      />
      <div className="flex justify-between my-4">
        <HomeStore jumlah={gudang2} />
        <HomeStore jumlah={gudang1} />
      </div>
      <BoardRow
        lubang={[...player1]}
        onClick={(i) => {
          if (currentTurn === "player1") handlePilihLubang(i);
        }}
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
