import { useState } from "react";
import useHasilGame from "../../api/hasil";
import { handleDeleteGame } from "../../api/hasil";

export default function AdminAllGame() {
  const [page, setPage] = useState(1);
  const { hasilGame, loading, pagination } = useHasilGame(page, 10);
  const [games, setGames] = useState([]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, pagination.totalPages));

  if (loading) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Rekap Seluruh Game
      </h2>

      <div className="space-y-6">
        {hasilGame.length > 0 ? (
          hasilGame.map((game, index) => (
            <div
              key={index}
              className="border shadow rounded-md overflow-hidden"
            >
              <div className="bg-gray-100 px-4 py-3 font-semibold text-sm sm:text-base">
                Game ID: {game.gameId}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-700">
                  <thead className="text-xs sm:text-sm text-white uppercase bg-blue-600">
                    <tr>
                      <th className="px-4 py-2 border">Nama Pemain</th>
                      <th className="px-4 py-2 border">Jawaban Benar</th>
                      <th className="px-4 py-2 border">Jawaban Salah</th>
                      <th className="px-4 py-2 border">Total Nilai</th>
                      <th className="px-4 py-2 border">Skor Lumbung</th>
                      <th className="px-4 py-2 border">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {game.players.map((player, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 border">{player.namaPemain}</td>
                        <td className="px-4 py-2 border">{player.benar}</td>
                        <td className="px-4 py-2 border">{player.salah}</td>
                        <td className="px-4 py-2 border">{player.total_nilai}</td>
                        <td className="px-4 py-2 border">{player.skorLumbung}</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() =>
                              handleDeleteGame(game.gameId, setGames)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black font-semibold text-center">
            Belum ada data game.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 font-bold gap-3">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded disabled:opacity-50"
        >
          &larr; Sebelumnya
        </button>
        <span className="text-sm">
          Halaman {pagination.currentPage} dari {pagination.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === pagination.totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded disabled:opacity-50"
        >
          Selanjutnya &rarr;
        </button>
      </div>
    </div>
  );
}
