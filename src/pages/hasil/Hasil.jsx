import { useState } from "react";
import useHasilGame from "../../api/hasil";

export default function AdminAllGame() {
  const [page, setPage] = useState(1);
  const { hasilGame, loading, pagination } = useHasilGame(page, 10);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, pagination.totalPages));

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Rekap Seluruh Game</h2>
      <div className="space-y-6">
        {hasilGame.length > 0 ? (
          hasilGame.map((game, index) => (
            <div
              key={index}
              className="border shadow rounded-md overflow-hidden"
            >
              <div className="bg-gray-100 p-3 font-semibold text-sm">
                Game ID: {game.gameId}
              </div>
              <table className="w-full text-sm text-center text-gray-700">
                <thead className="text-xs text-gray-100 uppercase bg-blue-500">
                  <tr>
                    <th className="px-4 py-2 border">Nama Pemain</th>
                    <th className="px-4 py-2 border">Jawaban Benar</th>
                    <th className="px-4 py-2 border">Jawaban Salah</th>
                    <th className="p-2 border">Total Nilai</th>
                    <th className="p-2 border">Skor Lumbung</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {game.players.map((player, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2 border">{player.namaPemain}</td>
                      <td className="px-4 py-2 border">{player.benar}</td>
                      <td className="px-4 py-2 border">{player.salah}</td>
                      <td className="p-2 border">{player.total_nilai}</td>
                      <td className="p-2 border">{player.skorLumbung}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-black font-bold text-center">
            Belum ada data game.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 font-bold">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          &larr; Sebelumnya
        </button>
        <span className="text-sm">
          Halaman {pagination.currentPage} dari {pagination.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === pagination.totalPages}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Selanjutnya &rarr;
        </button>
      </div>
    </div>
  );
}
