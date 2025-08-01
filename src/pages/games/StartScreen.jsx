import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const StartScreen = () => {
  const navigate = useNavigate();

  const playStartSound = () => {
    const audio = new Audio("/sound/game-start.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handleStart = (route) => {
    playStartSound();
    setTimeout(() => navigate(route), 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-screen-md p-4 sm:p-6 md:p-8 text-center"
      >
        <h1 className="uppercase text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-indigo-700 mb-4 leading-relaxed tracking-wide max-w-4xl mx-auto px-4 break-words">
          PENGEMBANGAN GAMES E-CONGKLAK BERBASIS HOTS PADA MATERI KEANEKARAGAMAN
          HAYATI UNTUK MENINGKATKAN LITERASI SAINS SISWA
        </h1>

        <p className="text-gray-700 text-sm sm:text-base mb-6 uppercase font-bold">
          Jawab pertanyaan untuk menggerakkan biji congkakmu dan kumpulkan skor
          tertinggi!
        </p>

        <ul className="text-justify list-decimal list-inside text-sm sm:text-base text-gray-600 mb-6 space-y-2">
          <li>Pilih lumbung congkak mana yang akan dijalankan pertama</li>
          <li>Jawablah pertanyaan sebelum menjalankan congkak</li>
          <li>Pertanyaan terdiri dari 14 soal</li>
          <li>Jawaban benar mendapatkan skor 10 per soal</li>
          <li>Masukkan biji ke lumbung untuk mendapatkan poin</li>
          <li>
            Pemain yang menjawab 14 soal terlebih dahulu permainan selesai
          </li>
          <li>
            Pemenang ditentukan dari nilai skor pertanyaan dan jumlah
            penyimpanan biji congkak
          </li>
        </ul>

        <p className="text-gray-700 text-sm sm:text-base mb-4 uppercase font-bold">
          Pilih Mode Permainan:
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleStart("/vs-com")}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition-all text-center"
          >
            1 vs Komputer
          </button>

          <button
            onClick={() => handleStart("/vs-player")}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition-all text-center"
          >
            1 vs 1 Bergantian
          </button>
        </div>
      </motion.div>
    </div>
  );
};
