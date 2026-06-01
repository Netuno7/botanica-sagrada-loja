import { Link } from "react-router-dom";

export default function LojaEsoterica() {
  const categorias = [
    <Link
  to="/velas"
  className="block mt-4 text-purple-300 font-bold"
>
  ABRIR PÁGINA DE VELAS
</Link>
  ];

  return (
    <div className="min-h-screen bg-[#0b1d15] text-white overflow-hidden">
      <header className="relative min-h-screen flex items-center justify-center text-center">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-purple-700/30 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[160px]" />

        <div className="relative z-10 max-w-5xl px-6">
          <p className="uppercase tracking-[8px] text-sm text-purple-300 mb-6">
            Produtos Artesanais
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            Botânica Sagrada
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
            Banhos, velas, óleos, chás, patuás e kits produzidos artesanalmente.
          </p>

          <a
            href="https://wa.me/554797002521"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-10 py-5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-700 to-violet-500"
          >
            Fazer Pedido no WhatsApp
          </a>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Categorias</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categorias.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group text-center block"
              >
                <div className="flex justify-center">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-40 h-40 rounded-full object-cover border-4 border-purple-500 group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {item.nome}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}