import { soalTambah, updateSoal, fetchSoalById } from "../../api/apiSoal";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

export const SoalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.pathname.includes("/edit");

  const {
    register,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location.pathname === "/soal/tambah") {
      reset();
    } else if (isEdit && id) {
      fetchSoalById(id).then((res) => reset(res.data));
    }
  }, [id, reset, isEdit, location.pathname]);

  const handleCustomSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Form belum lengkap atau valid!");
      return;
    }

    const result = await Swal.fire({
      title: "Apakah kamu yakin?",
      icon: "question",
      text: isEdit ? "Perubahan akan disimpan!" : "Soal akan ditambahkan!",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
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

    const data = watch();
    const toastId = toast.loading("Menyimpan...");

    try {
      data.nilai = parseInt(data.nilai);

      if (isEdit) {
        await updateSoal(id, data);
      } else {
        await soalTambah(data);
        reset();
      }

      toast.success("Berhasil disimpan!", { id: toastId });
      navigate("/soal");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-white to-blue-300 px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          {isEdit ? "Edit Soal" : "Tambah Soal"}
        </h2>

        <form onSubmit={handleCustomSubmit}>
          {/* Soal */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Soal</label>
            <textarea
              {...register("soal", { required: true })}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
            />
            {errors.soal && (
              <p className="text-sm text-red-500 mt-1">Soal wajib diisi</p>
            )}
          </div>

          {/* Jawaban */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {["a", "b", "c"].map((abjad) => (
                <div key={abjad} className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700">
                    Jawaban {abjad.toUpperCase()}
                  </label>
                  <input
                    {...register(`jawab_${abjad}`, { required: true })}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors[`jawab_${abjad}`] && (
                    <p className="text-sm text-red-500 mt-1">Harus diisi</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              {/* Jawaban D */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Jawaban D
                </label>
                <input
                  {...register("jawab_d", { required: true })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.jawab_d && (
                  <p className="text-sm text-red-500 mt-1">Harus diisi</p>
                )}
              </div>

              {/* Jawaban Benar */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Jawaban Benar
                </label>
                <select
                  {...register("jawaban_benar", { required: true })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Pilih jawaban</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
                {errors.jawaban_benar && (
                  <p className="text-sm text-red-500 mt-1">
                    Wajib pilih jawaban benar
                  </p>
                )}
              </div>

              {/* Nilai */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Nilai
                </label>
                <input
                  type="number"
                  {...register("nilai", { required: true, min: 1 })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.nilai && (
                  <p className="text-sm text-red-500 mt-1">
                    Nilai tidak boleh 0
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleCustomSubmit}
            className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isEdit ? "Simpan Perubahan" : "Simpan Soal"}
          </button>
        </form>
      </div>
    </div>
  );
};
