import React, { useState } from 'react';

export default function Home() {
  // Estado para controlar qual categoria está ativa na tela
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Menu de Categorias
  const categorias = [
    { nome: 'Todos', icone: '✨' },
    { nome: 'Velas', icone: '🕯️' },
    { nome: 'Chás', icone: '🫖' },
    { nome: 'Óleos', icone: '🧪' },
    { nome: 'Patuás', icone: '🧿' },
    { nome: 'Banhos', icone: '🌿' },
    { nome: 'Sal Ritualístico', icone: '🧂' },
    { nome: 'Kits', icone: '📦' },
  ];

  // Catálogo completo com 3 itens por categoria (Amor, Prosperidade e Proteção)
  const produtos = [
    // === VELAS ===
    { id: 1, nome: 'Vela Rosa do Amor', categoria: 'Velas', preco: 'R$ 15,00', imagem: '/produtos/vela-amor.png', desc: 'Uma vela artesanal em formato de rosa, criada para compor momentos de carinho, romantismo e autocuidado.' },
    { id: 2, nome: 'Vela de Lavanda para Harmonia (Aromatizada)', categoria: 'Velas', preco: 'R$ 30,00', imagem: '/produtos/vela-lavanda.png', desc: 'Ideal para criar uma atmosfera acolhedora, relaxante e harmoniosa, perfeita para momentos de descanso e bem-estar.' },
    { id: 3, nome: 'Vela Lavanda Premium (Aromatizada)', categoria: 'Velas', preco: 'R$ 30,00', imagem: '/produtos/vela-lavanda-rosa.png', desc: 'Esta vela artesanal destaca a delicadeza da lavanda em uma apresentação refinada.' },
   {
  id: 4,nome: 'Vela de Canela e Especiarias (Aromatizada)',categoria: 'Velas',preco: 'R$ 30,00',imagem: '/produtos/vela-canela.png',desc: 'Uma combinação marcante de canela, cravo e ervas aromáticas que transforma o ambiente com um toque quente e aconchegante.'},

    // === CHÁS ===
    { id: 5, nome: 'Chá Sopro de Vênus (Amor)', categoria: 'Chás', preco: 'R$ 10,00', imagem: '/produtos/cha-amor.jpeg', desc: 'Infusão de hibísco, Artemisía e Manjericão para magnetismo e afeto.' },
    { id: 6, nome: 'Chá Alquimia do Ouro (Prosperidade)', categoria: 'Chás', preco: 'R$ 10,00', imagem: '/produtos/cha-prosperidade.png', desc: 'Blend de Alecrim, Louro e Canela para atrair boa sorte.' },
    { id: 7, nome: 'Chá Escudo Sagrado (Proteção)', categoria: 'Chás', preco: 'R$ 10,00', imagem: '/produtos/cha-protecao.jpg', desc: 'Composto de Eucalipto, sálvia e Arruda para blindagem energética.' },

    // === ÓLEOS ===
    { id: 8, nome: 'Óleo de Atração (Amor)', categoria: 'Óleos', preco: 'R$ 30,00', imagem: '/produtos/oleo-amor.jpeg', desc: 'Elixir com óleo essencial de Amêndoa para o chakra cardíaco.' },
    { id: 9, nome: 'Óleo Alquímico Fortuna (Prosperidade)', categoria: 'Óleos', preco: 'R$ 30,00', imagem: '/produtos/oleo-prosperidade.png', desc: 'Infusiona0do com óleo essencial de Girasol com Alecrim, Louro e Canela,para atrair riqueza.' },
    { id: 10, nome: 'Óleo Protetor Luz Áurica (Proteção)', categoria: 'Óleos', preco: 'R$ 30,00', imagem: '/produtos/oleo-protecao.jpg', desc: 'óleo de semente de Uva, Arruda, Salvia e Eucalipto, para selar a aura contra negatividade.' },

    // === PATUÁS ===
    { id: 11, nome: 'Patuá Laços de Afeto (Amor)', categoria: 'Patuás', preco: 'R$ 25,00', imagem: '/produtos/patua-amor.jpeg', desc: 'Amuleto consagrado para harmonizar relacionamentos.' },
    { id: 12, nome: 'Patuá Ímã de Ouro (Prosperidade)', categoria: 'Patuás', preco: 'R$ 25,00', imagem: '/produtos/patua-prosperidade.png', desc: 'Para atrair prosperidade e movimentar o fluxo financeiro.' },
    { id: 13, nome: 'Patuá de blindagem (Proteção)', categoria: 'Patuás', preco: 'R$ 25,00', imagem: '/produtos/patua-protecao.jpg', desc: 'Forte escudo contra o mau-olhado, inveja e perigos.' },

    // === BANHOS ===
    { id: 14, nome: 'Banho de Ervas Conexão (Amor)', categoria: 'Banhos', preco: 'R$ 15,00', imagem: '/produtos/banho-amor.jpeg', desc: 'Hibísco, Artemisía e Manjericão, para despertar a doçura e auto-estima.' },
    { id: 15, nome: 'Banho de Ervas Abre Caminho (Prosperidade)', categoria: 'Banhos', preco: 'R$ 15,00', imagem: '/produtos/banho-prosperidade.png', desc: 'Alecrim, louro e canela para atrair movimento financeiro.' },
    { id: 16, nome: 'Banho de Descarrego Forte (Proteção)', categoria: 'Banhos', preco: 'R$ 15,00', imagem: '/produtos/banho-protecao.jpg', desc: 'Arruda, Salvia e Eucalipto para limpeza pesada.' },

    // === SAL RITUALÍSTICO ===
    { id: 17, nome: 'Sal Rosa Amor Incondicional (Amor)', categoria: 'Sal Ritualístico', preco: 'R$ 10,00', imagem: '/produtos/sal-amor.jpeg', desc: 'Para escalda-pés relaxantes focado em restaurar o afeto.' },
    { id: 18, nome: 'Sal de Banho Magnetismo (Prosperidade)', categoria: 'Sal Ritualístico', preco: 'R$ 10,00', imagem: '/produtos/sal-prosperidade.png', desc: 'Focado na vibração do sucesso.' },
    { id: 19, nome: 'Sal Negro de Bruxa (Proteção)', categoria: 'Sal Ritualístico', preco: 'R$ 10,00', imagem: '/produtos/sal-protecao.jpg', desc: 'Poderoso composto ritualístico para banir e quebrar demandas.' },

    // === KITS ===
    { id: 20, nome: 'Kit Ritual Amor Sagrado (Amor)', categoria: 'Kits', preco: 'R$ 110,00', imagem: '/produtos/kit-amor.jpeg', desc: 'Vela, Banho, Patuá, Chá, Óleo, Sal. Todos voltados a autocuidado e amor.' },
    { id: 21, nome: 'Kit Fluxo da Abundância (Prosperidade)', categoria: 'Kits', preco: 'R$ 110,00', imagem: '/produtos/kit-prosperidade.png', desc: 'O ritual completo para girar a energia financeira do seu lar.' },
    { id: 22, nome: 'Kit Portal da Proteção (Proteção)', categoria: 'Kits', preco: 'R$ 110,00', imagem: '/produtos/kit-protecao.jpg', desc: 'Vela de proteção, Banho, Sal Ritualístico, Chá, Óleo e Patuá.' },
  ];

  // Filtragem dos produtos baseado no clique do usuário
  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-serif selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] px-4 text-center bg-gradient-to-b from-[#1A0F2E] via-[#0A0A0A] to-[#0A0A0A] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4B0082]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Alquimia Natural & Bem-Estar</span>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white leading-tight">
            Desperte a cura através da <span className="text-[#C5A059] italic">Botânica Sagrada</span>
          </h1>
        </div>
      </section>

      {/* 2. SEÇÃO DE CATEGORIAS */}
      <section className="max-w-6xl mx-auto px-6 py-8 border-t border-zinc-900">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categorias.map((cat, index) => {
            const estaAtivo = categoriaAtiva === cat.nome;
            return (
              <button 
                key={index}
                onClick={() => setCategoriaAtiva(cat.nome)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl text-center transition-all duration-300 ${
                  estaAtivo 
                    ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37] font-semibold scale-105 shadow-md shadow-[#D4AF37]/20' 
                    : 'bg-zinc-950/40 border border-zinc-900 text-zinc-300 hover:border-[#D4AF37]/40'
                }`}
              >
                <span className="text-2xl mb-1">{cat.icone}</span>
                <h4 className="text-xs tracking-wider">{cat.nome}</h4>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. VITRINE DE PRODUTOS */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900 min-h-[500px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-light text-white tracking-wide">
            Exibindo: <span className="text-[#D4AF37] italic">{categoriaAtiva}</span>
          </h3>
          <span className="font-sans text-xs text-zinc-500">{produtosFiltrados.length} produto(s) listado(s)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => (
            <div 
              key={produto.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-zinc-950/50 border border-zinc-900 hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <div>
                {/* ESPAÇO PREPARADO PARA A IMAGEM REAL */}
                <div className="w-full h-48 bg-zinc-900/30 rounded-xl overflow-hidden mb-4 border border-zinc-900 flex items-center justify-center relative">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Se a imagem ainda não existir na sua pasta, mostra esse aviso sutil em vez de quebrar
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<span class="text-zinc-600 text-xs font-sans">Aguardando foto 🌿</span>';
                    }}
                  />
                </div>

                <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                  {produto.categoria}
                </span>
                <h4 className="text-lg font-medium text-white mt-2">{produto.nome}</h4>
                <p className="font-sans text-xs text-zinc-400 mt-1 font-light leading-relaxed">{produto.desc}</p>
              </div>
              
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-900">
                <span className="text-base font-sans font-medium text-white">{produto.preco}</span>
                <a
  href={`https://wa.me/5547097002521?text=${encodeURIComponent(
    `Olá! Tenho interesse em ${produto.nome} (${produto.preco}).`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-transparent hover:bg-[#D4AF37] border border-[#D4AF37] text-[#D4AF37] hover:text-black font-sans font-medium text-xs uppercase tracking-wider px-4 py-2 rounded transition-all duration-300"
>
  Comprar
</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 border-t border-zinc-900 font-sans text-xs text-zinc-600">
        <p>© 2026 Botânica Sagrada Loja. Feito com intenção.</p>
      </footer>

    </div>
  );
}