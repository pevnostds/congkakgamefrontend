import { useState, useEffect } from "react";
import axios from "axios";

const API_HASIL_GAME_URL = import.meta.env.VITE_API_HASIL_GAME_URL;

export default function useHasilGame(page = 1, limit = 10) {
  const [hasilGame, setHasilGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchHasilGame = async () => {
      try {
        const response = await axios.get(
          `${API_HASIL_GAME_URL}?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHasilGame(response.data.data);
        setPagination(response.data.pagination);
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
