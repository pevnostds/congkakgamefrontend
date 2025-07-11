import { useState } from "react";
import useHasilGame from "../../api/hasil";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function AdminAllGame() {
  const [page, setPage] = useState(1);
  const { hasilGame, loading, pagination } = useHasilGame(page, 10);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, pagination.totalPages));

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Hasil Seluruh Game</h2>
      <div className="overflow-auto rounded border shadow">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-xs uppercase text-center">
            <tr>
              <th className="px-4 py-2 border">Game ID</th>
              <th className="px-4 py-2 border">Nama Pemain</th>
              <th className="px-4 py-2 border">Tanggal</th>
              <th className="px-4 py-2 border">Nilai</th>
              <th className="px-4 py-2 border">Skor Lumbung</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {hasilGame.length > 0 ? (
              hasilGame.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border">{item.gameId}</td>
                  <td className="px-4 py-2 border">{item.namaPemain}</td>
                  <td className="px-4 py-2 border">
                    {dayjs(item.tanggal).format("D MMMM YYYY HH:mm")}
                  </td>
                  <td className="px-4 py-2 border">{item.total_nilai}</td>
                  <td className="px-4 py-2 border">{item.skorLumbung}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Belum ada data hasil game.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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
