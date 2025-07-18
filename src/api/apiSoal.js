import axios from "axios";

const API_SOAL_URL = import.meta.env.VITE_API_SOAL_URL;
const API_SOAL_TAMBAH_URL = import.meta.env.VITE_API_SOAL_CREATE_URL;
const API_SOAL_RANDOM_URL = import.meta.env.VITE_API_SOAL_RANDOM_URL;
const API_GAME_SKOR_URL = import.meta.env.VITE_API_GAME_SKOR_URL;
const API_ANSWER_URL = import.meta.env.VITE_API_ANSWER_URL;
const API_GAME_DELETE_URL = import.meta.env.VITE_API_DELETE_GAME_URL;
const token = localStorage.getItem("token");

export const soalTambah = async (data) => {
  const res = await axios.post(`${API_SOAL_TAMBAH_URL}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const dataSoal = async (page = 1) => {
  const res = await axios.get(`${API_SOAL_URL}?page=${page}&limit=5`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const soalDelete = async (id) => {
  try {
    const res = await axios.delete(`${API_SOAL_TAMBAH_URL}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Gagal menghapus soal:", err);
    throw err;
  }
};

export const fetchSoalById = async (id) => {
  const res = await axios.get(`${API_SOAL_TAMBAH_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateSoal = async (id, data) => {
  const res = await axios.put(`${API_SOAL_TAMBAH_URL}${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getRandomSoal = async () => {
  const res = await axios.get(`${API_SOAL_RANDOM_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const finishGame = async ({
  total_nilai,
  gameId,
  namaPemain,
  skorLumbung,
}) => {
  try {
    const response = await axios.post(
      `${API_GAME_SKOR_URL}`,
      {
        total_nilai,
        gameId,
        namaPemain,
        skorLumbung,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saat simpan skor:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Terjadi kesalahan",
    };
  }
};

export const submitAnswer = async ({
  gameId,
  userId,
  questionId,
  jawaban,
  namaPemain,
}) => {
  return await axios.post(
    `${API_ANSWER_URL}`,
    { gameId, userId, questionId, jawaban, namaPemain },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteGame = async (gameId) => {
  try {
    const res = await axios.delete(`${API_GAME_DELETE_URL}${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Gagal menghapus soal:", err);
    throw err;
  }
};