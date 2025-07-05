import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-600 mb-6">
        Sepertinya halaman yang kamu cari tidak tersedia.
      </p>
      <Link to="/games" className="text-blue-600 hover:underline font-semibold">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
