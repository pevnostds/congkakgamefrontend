import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";

export default function SoundControl() {
  const backsound = useRef(new Audio("/public/sound/backsound.mp3"));
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem("backsoundStatus") === "on";
    setIsOn(savedStatus);

    if (savedStatus) {
      backsound.current.loop = true;
      backsound.current.volume = 0.3;
      backsound.current.play().catch(() => {});
    }

    return () => {
      backsound.current.pause();
      backsound.current.currentTime = 0;
    };
  }, []);

  const toggleBacksound = () => {
    if (backsound.current.paused) {
      backsound.current.play();
      localStorage.setItem("backsoundStatus", "on");
      setIsOn(true);
    } else {
      backsound.current.pause();
      localStorage.setItem("backsoundStatus", "off");
      setIsOn(false);
    }
  };

  return (
    <button
      onClick={toggleBacksound}
      className="text-2xl text-indigo-700 hover:text-indigo-900 transition"
      title={isOn ? "Matikan Suara" : "Nyalakan Suara"}
    >
      {isOn ? <FiVolume2 /> : <FiVolumeX />}
    </button>
  );
}
