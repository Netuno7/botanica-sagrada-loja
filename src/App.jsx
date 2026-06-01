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
    { id: 1, nome: 'Vela Aromática de Quartzo Rosa (Amor)', categoria: 'Velas', preco: 'R$ 45,00', imagem: '/produtos/vela-amor.jpg', desc: 'Desperta o amor-próprio, a harmonia familiar e a cura emocional.' },
    { id: 2, nome: 'Vela de Canela & Louro (Prosperidade)', categoria: 'Velas', preco: 'R$ 45,00', imagem: '/produtos/vela-prosperidade.jpg', desc: 'Atrai abundância, sucesso financeiro e abre caminhos.' },
    { id: 3, nome: 'Vela de Arruda & Sal Grosso (Proteção)', categoria: 'Velas', preco: 'R$ 45,00', imagem: '/produtos/vela-protecao.jpg', desc: 'Limpeza espiritual profunda e proteção contra energias densas.' },

    // === CHÁS ===
    { id: 4, nome: 'Chá Sopro de Vênus (Amor)', categoria: 'Chás', preco: 'R$ 26,00', imagem: '/produtos/cha-amor.jpeg', desc: 'Infusão de hibisco, jasmim e maçã para magnetismo e afeto.' },
    { id: 5, nome: 'Chá Alquimia do Ouro (Prosperidade)', categoria: 'Chás', preco: 'R$ 26,00', imagem: '/produtos/cha-prosperidade.jpg', desc: 'Blend de calêndula, louro e hortelã para atrair boa sorte.' },
    { id: 6, nome: 'Chá Escudo Sagrado (Proteção)', categoria: 'Chás', preco: 'R$ 26,00', imagem: '/produtos/cha-protecao.jpg', desc: 'Composto de guiné, sálvia e alecrim para blindagem energética.' },

    // === ÓLEOS ===
    { id: 7, nome: 'Óleo de Unção Atração (Amor)', categoria: 'Óleos', preco: 'R$ 58,00', imagem: '/produtos/oleo-amor.jpeg', desc: 'Elixir com óleo essencial de rosas para o chakra cardíaco.' },
    { id: 8, nome: 'Óleo Alquímico Fortuna (Prosperidade)', categoria: 'Óleos', preco: 'R$ 58,00', imagem: '/produtos/oleo-prosperidade.jpeg', desc: 'Infusionado com pirita e bergamota para atrair riqueza.' },
    { id: 9, nome: 'Óleo Protetor Luz Áurica (Proteção)', categoria: 'Óleos', preco: 'R$ 58,00', imagem: '/produtos/oleo-protecao.jpeg', desc: 'Olíbano e mirra para selar a aura contra negatividade.' },

    // === PATUÁS ===
    { id: 10, nome: 'Patuá Laços de Afeto (Amor)', categoria: 'Patuás', preco: 'R$ 32,00', imagem: '/produtos/patua-amor.jpeg', desc: 'Amuleto consagrado para harmonizar relacionamentos.' },
    { id: 11, nome: 'Patuá Ímã de Ouro (Prosperidade)', categoria: 'Patuás', preco: 'R$ 32,00', imagem: '/produtos/patua-prosperidade.jpeg', desc: 'Contém sementes da abundância e cristais de citrino.' },
    { id: 12, nome: 'Patuá Patuá de São Jorge (Proteção)', categoria: 'Patuás', preco: 'R$ 35,00', imagem: '/produtos/patua-protecao.jpeg', desc: 'Forte escudo contra o mau-olhado, inveja e perigos.' },

    // === BANHOS ===
    { id: 13, nome: 'Banho de Ervas Conexão (Amor)', categoria: 'Banhos', preco: 'R$ 22,00', imagem: '/produtos/banho-amor.jpeg', desc: 'Pétalas de rosa e malva para despertar a doçura e auto-estima.' },
    { id: 14, nome: 'Banho de Ervas Abre Caminho (Prosperidade)', categoria: 'Banhos', preco: 'R$ 22,00', imagem: '/produtos/banho-prosperidade.jpeg', desc: 'Manjericão, louro e canela para atrair movimento financeiro.' },
    { id: 15, nome: 'Banho de Descarrego Forte (Proteção)', categoria: 'Banhos', preco: 'R$ 24,00', imagem: '/produtos/banho-protecao.jpeg', desc: 'Aroeira, pinhão roxo e guiné para limpeza pesada.' },

    // === SAL RITUALÍSTICO ===
    { id: 16, nome: 'Sal Rosa Amor Incondicional (Amor)', categoria: 'Sal Ritualístico', preco: 'R$ 28,00', imagem: '/produtos/sal-amor.jpeg', desc: 'Para escalda-pés relaxantes focado em restaurar o afeto.' },
    { id: 17, nome: 'Sal de Banho Magnetismo (Prosperidade)', categoria: 'Sal Ritualístico', preco: 'R$ 28,00', imagem: '/produtos/sal-prosperidade.jpeg', desc: 'Sal marinho com calêndula focado na vibração do sucesso.' },
    { id: 18, nome: 'Sal Negro de Bruxa (Proteção)', categoria: 'Sal Ritualístico', preco: 'R$ 30,00', imagem: '/produtos/sal-protecao.jpeg', desc: 'Poderoso composto ritualístico para banir e quebrar demandas.' },

    // === KITS ===
    { id: 19, nome: 'Kit Ritual Amor Sagrado (Amor)', categoria: 'Kits', preco: 'R$ 115,00', imagem: '/produtos/kit-amor.jpeg', desc: 'Vela, banho e cristal voltados ao autocuidado e amor.' },
    { id: 20, nome: 'Kit Fluxo da Abundância (Prosperidade)', categoria: 'Kits', preco: 'R$ 120,00', imagem: '/produtos/kit-prosperidade.jpeg', desc: 'O ritual completo para girar a energia financeira do seu lar.' },
    { id: 21, nome: 'Kit Portal da Proteção (Proteção)', categoria: 'Kits', preco: 'R$ 125,00', imagem: '/produtos/kit-protecao.jpeg', desc: 'Vela de arruda, defumador, sal ritualístico e patuá.' },
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
                <button className="bg-transparent hover:bg-[#D4AF37] border border-[#D4AF37] text-[#D4AF37] hover:text-black font-sans font-medium text-xs uppercase tracking-wider px-4 py-2 rounded transition-all duration-300">
                  Ver Detalhes
                </button>
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