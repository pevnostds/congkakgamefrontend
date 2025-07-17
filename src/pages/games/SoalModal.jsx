import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";

export const  SoalModal=({
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
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <ModalHeader className="font-bold text-center pb-2 bg-black bg-opacity-50">
            <p className="text-lg text-white m-3">
              Soal untuk {player === "player1" ? nama1 : nama2||"Player 1"}
            </p>
          </ModalHeader>
          <ModalBody className="bg-black bg-opacity-60 text-white">
            <div className="mb-3 text-right text-sm">
              Sisa waktu: <span className="font-bold">{countdown}s</span>
            </div>

            <p className="font-medium mb-4">{soal.soal}</p>
            <div className="space-y-3">
              <button
                onClick={() => onJawab("a")}
                className="w-full px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-300 text-blue-800 font-semibold transition"
              >
                {`A. ${soal.jawab_a}`}
              </button>
              <button
                onClick={() => onJawab("b")}
                className="w-full px-4 py-2 rounded-lg bg-green-100 hover:bg-green-300 text-green-800 font-semibold transition"
              >
                {`B. ${soal.jawab_b}`}
              </button>
              <button
                onClick={() => onJawab("c")}
                className="w-full px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-300 text-yellow-800 font-semibold transition"
              >
                {`C. ${soal.jawab_c}`}
              </button>
              <button
                onClick={() => onJawab("d")}
                className="w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-300 text-red-800 font-semibold transition"
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
}
