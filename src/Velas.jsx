export default function Velas() {
  return (
    <div className="min-h-screen bg-[#0b1d15] text-white p-10">
      <h1 className="text-5xl font-bold mb-10">Velas Artesanais</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white/5 p-6 rounded-3xl">
          <h2 className="text-2xl mb-2">Vela de Prosperidade</h2>
          <p className="text-gray-300">
            Descrição da vela.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl">
          <h2 className="text-2xl mb-2">Vela de Amor</h2>
          <p className="text-gray-300">
            Descrição da vela.
          </p>
        </div>
      </div>
    </div>
  );
}