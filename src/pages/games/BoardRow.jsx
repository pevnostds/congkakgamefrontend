export const BoardRow = ({ lubang, onClick, disabled }) => {
  return (
    <div className="flex justify-center gap-2">
      {lubang.map((biji, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          disabled={disabled || biji === 0}
          className={`w-14 h-14 rounded-full bg-green-300 font-bold shadow ${
            biji === 0 ? "opacity-50" : ""
          }`}
        >
          {biji}
        </button>
      ))}
    </div>
  );
};
