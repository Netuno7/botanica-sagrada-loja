import { Link } from "react-router-dom";

export default function Home() {
  const categorias = [
    { nome: "Velas", link: "/velas" },
    { nome: "Banhos", link: "/banhos" },
    { nome: "Óleos", link: "/oleos" },
    { nome: "Chás", link: "/chas" },
    { nome: "Patuás", link: "/patuas" },
    { nome: "Kits", link: "/kits" },
  ];

  return (
    <div className="min-h-screen bg-[#0b1d15] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Botânica Sagrada
        </h1>

        <p className="text-xl text-gray-300 mb-12">
          Produtos artesanais de amor, prosperidade e proteção.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {categorias.map((item) => (
            <Link
              key={item.nome}
              to={item.link}
              className="bg-white/5 p-10 rounded-3xl border border-purple-500/30 hover:border-purple-500 transition"
            >
              <h2 className="text-2xl font-bold">
                {item.nome}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}