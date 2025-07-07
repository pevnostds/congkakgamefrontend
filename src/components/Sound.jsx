import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";

export default function SoundControl() {
  const backsound = useRef(null);
  const [isOn, setIsOn] = useState(false);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    backsound.current = new Audio("/sound/backsound.mp3");
    backsound.current.loop = true;
    backsound.current.volume = 0.3;

    const savedStatus = localStorage.getItem("backsoundStatus") === "on";
    setIsOn(savedStatus);

    const handleInteraction = () => {
      if (!initialized) {
        if (savedStatus) {
          backsound.current.play().catch(() => {});
        }
        setInitialized(true);
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      backsound.current.pause();
      backsound.current.currentTime = 0;
    };
  }, [initialized]);

  const toggleBacksound = () => {
    if (!backsound.current) return;

    if (backsound.current.paused) {
      backsound.current.play().catch(() => {});
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
