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
    <div className="flex items-center justify-center min-h-screen ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl p-6 sm:p-8 text-center"
      >
        <h1 className="uppercase text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-700 mb-4">
          Congkak Quiz Challenge
        </h1>

        <p className="text-gray-700 text-sm sm:text-base mb-6 uppercase font-bold">
          Jawab pertanyaan untuk menggerakkan biji congkakmu dan kumpulkan skor
          tertinggi!
        </p>

        <ul className="text-justify list-decimal list-inside text-sm sm:text-base text-gray-600 mb-6 space-y-2">
          <li>Pilih Lumbung Congkak Mana Yang Akan DiJalankan Pertama</li>
          <li>Jawablah Pertanyaan Sebelum Menjalankan Congkak</li>
          <li>Perttanyaan Terdiri Dari 14 Soal</li>
          <li>Jawaban Benar Mendapatkan Skor 10/Soal</li>
          <li>Masukkan Biji Kelumbung Untuk Mendapatkan Poin</li>
          <li>Pemain Yang Menjawab 14 Soal Terlebih Dahulu Permainan Selesai</li>
          <li>Pemenang Ditentukan Dari Nilai Skor Pertanyaan Dan Jumlah Penyimpanan Biji Congkak</li>

        </ul>

        <p className="text-gray-700 text-sm sm:text-base mb-6 uppercase font-bold">
          Pilih Mode Permainan:
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => handleStart("/vs-com")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition-all text-center"
          >
            1 vs Komputer
          </button>

          <button
            onClick={() => handleStart("/vs-player")}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition-all text-center"
          >
            1 vs 1 Bergantian
          </button>
        </div>
      </motion.div>
    </div>
  );
};
