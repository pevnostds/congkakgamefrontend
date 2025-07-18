import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";

export const SoalModal = ({
  show,
  soal,
  onJawab,
  onClose,
  player,
  nama1,
  nama2,
  backgroundImage,
}) => {
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (!show || !soal) return;

    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onJawab(null);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, soal]);

  if (!soal) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      size="md"
      popup
      className="bg-white bg-opacity-60 backdrop-blur-sm"
    >
      <div
        className="w-full rounded-xl overflow-hidden relative"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay transparan agar teks tetap kontras */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

        {/* Konten soal di atas layer transparan */}
        <div className="relative z-10">
          <ModalHeader className="font-bold text-center pb-2">
            <p className="text-lg text-white m-3">
              Soal untuk {player === "player1" ? nama1 : nama2 || "Player 1"}
            </p>
          </ModalHeader>
          <ModalBody className="text-white">
            <div className="mb-3 text-right text-sm">
              Sisa waktu: <span className="font-bold">{countdown}s</span>
            </div>

            <p className="font-medium  mb-4">{soal.soal}</p>
            <div className="space-y-3">
              <button
                onClick={() => onJawab("a")}
                className="w-full px-4 py-2 rounded-lg border border-blue-400 bg-white bg-opacity-10 hover:bg-blue-200 hover:bg-opacity-30 text-white font-semibold transition"
              >
                {`A. ${soal.jawab_a}`}
              </button>
              <button
                onClick={() => onJawab("b")}
                className="w-full px-4 py-2 rounded-lg border border-green-400 bg-white bg-opacity-10 hover:bg-green-200 hover:bg-opacity-30 text-white font-semibold transition"
              >
                {`B. ${soal.jawab_b}`}
              </button>
              <button
                onClick={() => onJawab("c")}
                className="w-full px-4 py-2 rounded-lg border border-yellow-400 bg-white bg-opacity-10 hover:bg-yellow-200 hover:bg-opacity-30 text-white font-semibold transition"
              >
                {`C. ${soal.jawab_c}`}
              </button>
              <button
                onClick={() => onJawab("d")}
                className="w-full px-4 py-2 rounded-lg border border-red-400 bg-white bg-opacity-10 hover:bg-red-200 hover:bg-opacity-30 text-white font-semibold transition"
              >
                {`D. ${soal.jawab_d}`}
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 block mx-auto text-sm bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
            >
              Tutup
            </button>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};
