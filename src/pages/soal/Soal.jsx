import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataSoal } from "../../api/apiSoal";
import { Link } from "react-router-dom";
import { ModalDetailSoal, DeleteButton } from "./ComponentSoal";
import { soalDelete } from "../../api/apiSoal";

export const Soal = () => {
  const [page, setPage] = useState(1);
  const [selectedSoal, setSelectedSoal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["soal", page],
    queryFn: () => dataSoal(page),
    keepPreviousData: true,
  });

  const renderTableBody = () => {
    if (!data || !data.data || data.data.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-6 text-gray-500">
            Tidak ada data soal.
          </td>
        </tr>
      );
    }

    return data.data.map((item, i) => {
      const soal = item.data;
      return (
        <tr
          key={soal.id}
          className="bg-white border-b hover:bg-gray-50 transition"
        >
          <td className="px-4 py-3 text-center">{(page - 1) * 5 + i + 1}</td>
          <td className="px-4 py-3">{soal.soal}</td>
          <td className="px-4 py-3 text-center font-medium text-green-600">
            {soal.jawaban_benar.toUpperCase()}
          </td>
          <td className="px-4 py-3 text-center">{soal.nilai}</td>
          <td className="px-4 py-3 text-center space-x-2">
            <Link
              to={`/soal/edit/${soal.id}`}
              className="inline-block text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </Link>
            <DeleteButton
              id={soal.id}
              onDelete={async (id) => {
                await soalDelete(id);
                refetch(); // ini penting untuk perbarui data soal setelah dihapus
              }}
            />
            <button
              onClick={() => {
                setSelectedSoal(soal);
                setModalOpen(true);
              }}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Detail
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-white to-blue-300 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">📋 Data Soal</h1>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="ml-4 text-blue-600 font-medium">
              Memuat data...
            </span>
          </div>
        ) : isError ? (
          <p className="text-red-600 text-center font-medium">
            Terjadi kesalahan saat mengambil data.
          </p>
        ) : (
          <>
            <div className="relative overflow-x-auto rounded-lg shadow-md bg-white">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-100 uppercase bg-blue-500">
                  <tr>
                    <th className="px-4 py-3 text-center">No</th>
                    <th className="px-4 py-3 text-center">Soal</th>
                    <th className="px-4 py-3 text-center">Benar</th>
                    <th className="px-4 py-3 text-center">Nilai</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </table>
            </div>

            {/* Modal Detail */}
            <ModalDetailSoal
              show={modalOpen}
              onClose={() => setModalOpen(false)}
              soal={selectedSoal}
            />

            {/* Pagination */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  ⬅ Prev
                </button>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, data.meta.totalPage))
                  }
                  disabled={
                    page === data.meta.totalPage || data.meta.totalPage === 0
                  }
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  Next ➡
                </button>
              </div>
              <span className="text-sm text-gray-700">
                Halaman <strong>{page}</strong> dari{" "}
                <strong>{data.meta.totalPage}</strong>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
