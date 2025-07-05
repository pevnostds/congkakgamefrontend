export const PlayerInfo = ({ name, skorLumbung, skorNilai, turn }) => {
  return (
    <div className="text-center mb-2">
      <p className="font-semibold text-lg">{name}</p>
      <p className="text-sm">Lumbung: {skorLumbung}</p>
      <p className="text-sm text-blue-600">Nilai Soal: {skorNilai}</p>
      {turn && <p className="text-green-600 font-bold">Giliranmu</p>}
    </div>
  );
};
