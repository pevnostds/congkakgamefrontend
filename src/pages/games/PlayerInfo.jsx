export const PlayerInfo = ({ name, skorLumbung, skorNilai, turn }) => {
  return (
    <div className="text-center mb-2">
      <p className="text-lg font-bold uppercase">Player {name}</p>
      <p className="font-bold text-lg text-dark">Lumbung: {skorLumbung}</p>
      <p className="font-bold text-lg text-blue-600">Nilai Soal: {skorNilai}</p>
      {turn && <p className="text-green-800 text-lg font-bold">Giliranmu</p>}
    </div>
  );
};
