import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SoalForm } from "./pages/soal/SoalForm";
import { Login } from "./pages/auth/Login";
import { useAuth } from "./api/auth";
import { Soal } from "./pages/soal/Soal";
import { Toaster } from "react-hot-toast";
import GamePage from "./pages/games/GamePage";
import { Register } from "./pages/auth/Register";
import { ProtectedRoute } from "./components/Authentication";
import NotFoundPage from "./components/NotFoundPage";
import { TambahUser } from "./pages/user/UserForm";
import GameVs1v1 from "./pages/games/Game1vs1";
import { StartScreen } from "./pages/games/StartScreen";
import AdminAllGame from "./pages/hasil/Hasil";
function App() {
  const isLoggedIn = useAuth();
  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Toaster position="top-right" />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/soal/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SoalForm mode="edit" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/soal"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Soal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hasil"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAllGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/soal/tambah"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SoalForm mode="tambah" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/tambah"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TambahUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute allowedRoles={["player"]}>
                <StartScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vs-com"
            element={
              <ProtectedRoute allowedRoles={["player"]}>
                <GamePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vs-player"
            element={
              <ProtectedRoute allowedRoles={["player"]}>
                <GameVs1v1 />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
