import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

export const ModalDetailSoal = ({ show, onClose, soal }) => {
  if (!soal) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Detail Soal</ModalHeader>
      <ModalBody>
        <div className="space-y-4 text-gray-800 text-sm md:text-base">
          <div>
            <h2 className="font-semibold text-blue-700 mb-1">Soal:</h2>
            <p className="bg-gray-100 p-3 rounded">{soal.soal}</p>
          </div>

          <div>
            <h2 className="font-semibold text-blue-700 mb-1">
              Pilihan Jawaban:
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none">
              <li className="bg-white shadow p-2 rounded border">
                <strong>A:</strong> {soal.jawab_a}
              </li>
              <li className="bg-white shadow p-2 rounded border">
                <strong>B:</strong> {soal.jawab_b}
              </li>
              <li className="bg-white shadow p-2 rounded border">
                <strong>C:</strong> {soal.jawab_c}
              </li>
              <li className="bg-white shadow p-2 rounded border">
                <strong>D:</strong> {soal.jawab_d}
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <p>
              <span className="font-semibold">Jawaban Benar:</span>{" "}
              <span className="text-green-600 uppercase font-bold">
                {soal.jawaban_benar}
              </span>
            </p>
            <p>
              <span className="font-semibold">Nilai:</span>{" "}
              <span className="text-blue-600 font-bold">{soal.nilai}</span>
            </p>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mx-2",
        cancelButton:
          "bg-gray-300 hover:bg-red-400 text-black font-semibold px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    const toastId = toast.loading("Menghapus...");
    try {
      await onDelete(id);
      toast.success("Soal Berhasil Dihapus", { id: toastId });
    } catch {
      toast.error("Gagal menghapus", { id: toastId });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    >
      Hapus
    </button>
  );
};
