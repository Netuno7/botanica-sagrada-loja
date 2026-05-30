export default function LojaEsoterica() {
  const categorias = [
    {
      nome: 'Velas',
      imagem:
        'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nome: 'Óleos',
      imagem:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nome: 'Chás',
      imagem:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nome: 'Patuás',
      imagem:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nome: 'Banhos',
      imagem:
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nome: 'Kits',
      imagem:
        'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1d15] text-white overflow-hidden">
      <header className="relative min-h-screen flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop"
          alt="Botânica Sagrada"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-purple-700/30 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[160px]" />

        <div className="relative z-10 max-w-5xl px-6">
          <p className="uppercase tracking-[8px] text-sm text-purple-300 mb-6">
            Produtos Artesanais
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
            Botânica Sagrada
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
            Banhos, velas, óleos, chás, patuás e kits produzidos com identidade
            artesanal, inspiração botânica e estética mística.
          </p>

          <a
            href="https://wa.me/554797002521"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-10 py-5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-700 to-violet-500 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Fazer Pedido no WhatsApp
          </a>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Categorias</h2>

            <p className="text-gray-300 max-w-2xl mx-auto">
              Escolha uma categoria para visualizar os produtos disponíveis.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categorias.map((item, index) => (
              <div
                key={index}
                className="group text-center cursor-pointer"
              >
                <div className="flex justify-center">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-40 h-40 rounded-full object-cover border-4 border-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.45)] group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.nome}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-[40px] p-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Produção Artesanal
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Cada produto da Botânica Sagrada é preparado com cuidado,
            valorizando ingredientes selecionados, apresentação elegante e uma
            identidade visual única.
          </p>
        </div>
      </section>

      <footer className="border-t border-purple-800/20 py-10 text-center text-gray-400">
        © 2026 Botânica Sagrada • Todos os direitos reservados
      </footer>
    </div>
  );
}