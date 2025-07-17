import { useState } from "react";
import toast from "react-hot-toast";
import { register } from "../../api/auth";

export const TambahUser = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "player",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.passwordConfirm
    ) {
      toast.error("Semua kolom wajib diisi");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    try {
      await register(form);
      toast.success("User Berhasil Ditambahkan!");
      setForm({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "player",
      });
    } catch (err) {
      const message =
        err?.response?.data?.message || "Terjadi Kesalahan Saat Menambah User";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Tambah User Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Tambah User
          </button>
        </form>
      </div>
    </div>
  );
};
