import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserRole } from "../api/auth";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const role = getUserRole();
  console.log(role);
  return (
    <nav className="bg-white border-b border-gray-300 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-blue-600">Congkak Games</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {role === "player" && (
              <Link
                to="/games"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Games
              </Link>
            )}
            {role === "admin" && (
              <>
                <Link
                  to="/hasil"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Hasil
                </Link>
                <Link
                  to="/soal"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Soal
                </Link>
                <Link
                  to="/soal/tambah"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Tambah Soal
                </Link>
                <Link
                  to="/user/tambah"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Tambah User
                </Link>
              </>
            )}

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {role === "player" && (
            <Link
              to="/games"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Games
            </Link>
          )}

          {role === "admin" && (
            <>
              <Link
                to="/hasil"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Hasil
              </Link>
              <Link
                to="/soal"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Soal
              </Link>
              <Link
                to="/soal/tambah"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Tambah Soal
              </Link>
              <Link
                to="/user/tambah"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Tambah User
              </Link>
            </>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
