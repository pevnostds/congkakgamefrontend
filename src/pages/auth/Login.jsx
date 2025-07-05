import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);

      const decoded = jwtDecode(data.token);
      const role = decoded.role;

      toast.success("Login berhasil!", {
        duration: 3000,
        position: "top-right",
      });

      setTimeout(() => {
        if (role === "admin") {
          navigate("/soal");
        } else if (role === "player") {
          navigate("/games");
        } else {
          navigate("/");
        }

        window.location.reload(); 
      }, 1000);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Periksa Kembali Email dan Password Anda",
        confirmButtonColor: "#2563eb",
        customClass: {
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mx-2",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-2 text-center">
          <Link
            to="/register"
            className="text-sm text-gray-700 hover:text-blue-600 font-medium"
          >
            Belum punya akun? <span className="underline">Register</span>
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};
