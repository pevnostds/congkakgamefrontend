import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteGame } from "./apiSoal";
import toast from "react-hot-toast";
const API_HASIL_GAME_URL = import.meta.env.VITE_API_HASIL_GAME_URL;

export default function useHasilGame(page = 1, limit = 5) {
  const [hasilGame, setHasilGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchHasilGame = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_HASIL_GAME_URL}?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setHasilGame(response.data.data || []);
        setPagination({
          currentPage: response.data.currentPage || 1,
          totalPages: response.data.totalPages || 1,
        });
      } catch (error) {
        console.error("Gagal mengambil hasil game:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHasilGame();
  }, [page, limit]);

  return { hasilGame, loading, pagination };
}

export const handleDeleteGame = async (gameId, setGames) => {
  const result = await Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data permainan ini akan dihapus permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded mr-2",
      cancelButton:
        "bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded",
    },
  });

  if (result.isConfirmed) {
    try {
      await deleteGame(gameId);
      toast.success("Data permainan berhasil dihapus.");

      setGames((prev) => prev.filter((g) => g.gameId !== gameId));

      Swal.fire({
        title: "Terhapus!",
        text: "Data permainan telah dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus.",
        icon: "error",
      });
    }
  }
};
