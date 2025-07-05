import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const StartScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 p-4">
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
          <li>Jawab soal sebelum melangkah</li>
          <li>Jawaban benar menambah skor nilai</li>
          <li>
              Masukkan Biji Ke Lumbung 
          </li>
          <li>Pemain dengan total skor tertinggi menang</li>
        </ul>

     <p className="text-gray-700 text-sm sm:text-base mb-6 uppercase font-bold">
          Pilih Mode Permainan:
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/vs-com"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition-all text-center"
          >
            1 vs Komputer
          </Link>

          <Link
            to="/vs-player"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition-all text-center"
          >
            1 vs 1 Bergantian
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
