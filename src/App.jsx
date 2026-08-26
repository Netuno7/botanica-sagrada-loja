// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { CONFIG, CATEGORIAS, PRODUTOS_MASTER } from './data/produtos';

const CUPONS_VALIDOS = {
  'VENUS': 0.15,
  'NETUNO': 0.15,
  'BELAYMA': 0.15,
  'BOTANICA10': 0.10, 
  'SAGRADO15': 0.15 
};

const VALOR_MINIMO_BRINDE = 200.00;

const IMAGEM_PADRAO_KIT = "/produtos/kit-amor.jpeg";

const ITENS_DESTAQUE = [
  {
    nome: "Kit Completo de Autocuidado",
    foto: "/produtos/kit-amor.jpeg",
    fallback: "/produtos/kit-amor.jpeg"
  },
  {
    nome: "Banho Botânico: Amor e Magnetismo",
    foto: "/produtos/banho-amor.jpeg",
    fallback: "/produtos/banho-amor.jpeg"
  },
  {
    nome: "Óleo Botânico: Amor e Atração",
    foto: "/produtos/oleo-amor.jpeg",
    fallback: "/produtos/oleo-amor.jpeg"
  },
  {
    nome: "Blend Natural: Chá de Amor e Autoestima",
    foto: "/produtos/cha-amor.jpeg",
    fallback: "/produtos/cha-amor.jpeg"
  },
  {
    nome: "Sal Aromático: Amor e Sedução",
    foto: "/produtos/sal-amor.jpeg",
    fallback: "/produtos/sal-amor.jpeg"
  },
  {
    nome: "Amuleto Botânico: Magnetismo e Intenção",
    foto: "/produtos/patua-amor.jpeg",
    fallback: "/produtos/patua-amor.jpeg"
  }
];

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('loja'); 
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [buscaTermo, setBuscaTermo] = useState('');
  const [ordenacao, setOrdenacao] = useState('default'); 
  
  const [carrinho, setCarrinho] = useState([]);
  const [etapaCheckout, setEtapaCheckout] = useState('carrinho'); 
  const [idProdutoVisualizar, setIdProdutoVisualizar] = useState(null);

  const [codigoCupom, setCodigoCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(null); 
  const [erroCupom, setErroCupom] = useState('');

  const [cep, setCep] = useState('');
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');
  const [endereco, setEndereco] = useState({ rua: '', numero: '', bairro: '', cidade: '', estado: '', complemento: '' });
  const [dadosCliente, setDadosCliente] = useState({ nome: '', sobrenome: '', telefone: '', cpf: '', observacoes: '' });
  const [frete, setFrete] = useState(0);
  const [freteCalculado, setFreteCalculado] = useState(false);

  const [notificacaoAtiva, setNotificacaoAtiva] = useState(null);
  const [fotoAtivaIndex, setFotoAtivaIndex] = useState(0);

  const kitDestaqueAmor = useMemo(() => {
    return {
      id: 701,
      nome: "Kit de Autocuidado: Amor & Atração",
      descricao: "Sinergia botânica artesanal criada para cultivar o amor-próprio, elevar sua vibração magnética e trazer harmonia para a sua rotina.",
      preco: 60.00,
      imagem: "/produtos/kit-amor.jpeg",
      categoria: "kits",
      detalhes: [
        "Blend Natural: Chá de Amor e Autoestima",
        "Óleo Botânico: Amor e Atração",
        "Banho Botânico: Amor e Magnetismo",
        "Sal Aromático: Amor e Sedução",
        "Amuleto Botânico: Magnetismo e Intenção"
      ]
    };
  }, []);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('botanica_cart');
    if (carrinhoSalvo) {
      try { setCarrinho(JSON.parse(carrinhoSalvo)); } catch(e) { localStorage.removeItem('botanica_cart'); }
    }
  }, []);

  const dispararNotificacao = (mensagem) => {
    setNotificacaoAtiva(mensagem);
    setTimeout(() => { setNotificacaoAtiva(null); }, 3500);
  };

  const produtosFiltrados = useMemo(() => {
    let base = [...PRODUTOS_MASTER];
    if (categoriaSelecionada !== 'todos') {
      base = base.filter(p => p.categoria === categoriaSelecionada);
    }
    if (buscaTermo.trim() !== '') {
      const termo = buscaTermo.toLowerCase();
      base = base.filter(p => p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo));
    }
    if (ordenacao === 'menor-preco') base.sort((a, b) => a.preco - b.preco);
    else if (ordenacao === 'maior-preco') base.sort((a, b) => b.preco - a.preco);
    else if (ordenacao === 'alfabetica') base.sort((a, b) => a.nome.localeCompare(b.nome));
    return base;
  }, [categoriaSelecionada, buscaTermo, ordenacao]);

  const totalGeralProdutos = useMemo(() => carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0), [carrinho]);
  const valorDescontoCupom = useMemo(() => cupomAplicado ? totalGeralProdutos * cupomAplicado.valor : 0, [cupomAplicado, totalGeralProdutos]);
  const ganhaBrindeExtra = useMemo(() => totalGeralProdutos >= VALOR_MINIMO_BRINDE, [totalGeralProdutos]);
  const totalFinalComDescontosEFrete = useMemo(() => Math.max(0, totalGeralProdutos - valorDescontoCupom + frete), [totalGeralProdutos, valorDescontoCupom, frete]);
  const totalItensNoCarrinho = useMemo(() => carrinho.reduce((sum, item) => sum + item.qtd, 0), [carrinho]);
  const metaCategoriaAtiva = useMemo(() => CATEGORIAS.find(c => c.id === categoriaSelecionada) || CATEGORIAS[0], [categoriaSelecionada]);
  const produtoEmModal = useMemo(() => PRODUTOS_MASTER.find(p => p.id === idProdutoVisualizar) || kitDestaqueAmor, [idProdutoVisualizar, kitDestaqueAmor]);

  const atualizarEPersistirCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('botanica_cart', JSON.stringify(novoCarrinho));
  };

  const adicionarAoCarrinho = (produto) => {
    const copia = [...carrinho];
    const existente = copia.find(item => item.id === produto.id);
    if (existente) { existente.qtd += 1; } else { copia.push({ ...produto, qtd: 1 }); }
    atualizarEPersistirCarrinho(copia);
    dispararNotificacao(`🌹 "${produto.nome}" foi adicionado à sua sacola.`);
  };

  const alterarQuantidadeItem = (id, modificador) => {
    const atualizado = carrinho.map(item => {
      if (item.id === id) {
        const novaQtd = item.qtd + modificador;
        return novaQtd > 0 ? { ...item, qtd: novaQtd } : item;
      }
      return item;
    }).filter(item => item.qtd > 0);
    atualizarEPersistirCarrinho(atualizado);
  };

  const removerDoCarrinhoDefinitivo = (id, nome) => {
    const filtrado = carrinho.filter(item => item.id !== id);
    atualizarEPersistirCarrinho(filtrado);
    dispararNotificacao(`💼 "${nome}" removido dos seus cuidados.`);
  };

  const aplicarCupomDesconto = (e) => {
    e.preventDefault();
    setErroCupom('');
    const cupomTratado = codigoCupom.trim().toUpperCase();
    if (CUPONS_VALIDOS.hasOwnProperty(cupomTratado)) {
      setCupomAplicado({ nome: cupomTratado, valor: CUPONS_VALIDOS[cupomTratado] });
      dispararNotificacao(`✨ Cupom "${cupomTratado}" ativado (${CUPONS_VALIDOS[cupomTratado] * 100}% OFF).`);
    } else {
      setErroCupom('Código promocional inválido.');
    }
  };

  const processarLidagemCep = async (e) => {
    const valorCru = e.target.value.replace(/\D/g, '');
    setCep(valorCru);
    if (valorCru.length === 8) {
      setCarregandoCep(true);
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valorCru}/json/`);
        const dados = await resposta.json();
        if (!dados.erro) {
          setEndereco(p => ({ ...p, rua: dados.logradouro || '', bairro: dados.bairro || '', cidade: dados.localidade || '', estado: dados.uf || '' }));
          setFrete(dados.uf === 'SP' || dados.uf === 'SC' ? 15.00 : 25.00);
          setFreteCalculado(true);
        } else { setErroCep('CEP não encontrado.'); }
      } catch (err) { setErroCep('Erro ao buscar CEP.'); }
      finally { setCarregandoCep(false); }
    }
  };

  const dispararPedidoParaWhatsapp = (e) => {
    e.preventDefault();
    let m = `🌿 *PEDIDO DE AUTOCUIDADO - ${CONFIG.NOME_LOJA}* 🌿\n_${CONFIG.SLOGAN}_\n\n`;
    m += `👤 *DESTINATÁRIO*\n• *Nome:* ${dadosCliente.nome.toUpperCase()} ${dadosCliente.sobrenome.toUpperCase()}\n• *Contato:* ${dadosCliente.telefone}\n\n`;
    m += `📦 *ITENS SELECIONADOS*\n`;
    carrinho.forEach(item => m += `▪️ ${item.qtd}x _${item.nome}_ (${CONFIG.MOEDA} ${item.preco.toFixed(2)}/un)\n`);
    if (ganhaBrindeExtra) m += `🎁 *CORTESIA:* 1x _Amostra Especial de Mimo Botânico_\n`;
    m += `\n🚚 *ENDEREÇO DE ENTREGA*\n• ${endereco.rua}, Nº ${endereco.numero} - ${endereco.bairro}\n• ${endereco.cidade}/${endereco.estado} - CEP: ${cep}\n\n`;
    m += `💰 *RESUMO DO PEDIDO*\n• Produtos: ${CONFIG.MOEDA} ${totalGeralProdutos.toFixed(2)}\n• Frete: ${CONFIG.MOEDA} ${frete.toFixed(2)}\n`;
    if (cupomAplicado) m += `• Desconto (${cupomAplicado.nome}): -${CONFIG.MOEDA} ${valorDescontoCupom.toFixed(2)}\n`;
    m += `• *TOTAL FINAL:* ${CONFIG.MOEDA} ${totalFinalComDescontosEFrete.toFixed(2)}\n`;
    window.open(`https://api.whatsapp.com/send?phone=${CONFIG.TELEFONE_WHATSAPP}&text=${encodeURIComponent(m)}`, '_blank');
    atualizarEPersistirCarrinho([]);
    setEtapaCheckout('carrinho');
    setAbaAtiva('loja');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E2B] font-sans antialiased">
      {notificacaoAtiva && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3B0B11] text-[#FFF5F5] border border-[#8B0000]/50 px-6 py-4 rounded-2xl shadow-2xl text-xs tracking-wider flex items-center gap-2">
          <span>💖</span> {notificacaoAtiva}
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-[#E3DDD1] bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-5 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="text-center lg:text-left cursor-pointer" onClick={() => { setAbaAtiva('loja'); setEtapaCheckout('carrinho'); }}>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-black text-[#2C3E2B]">{CONFIG.NOME_LOJA}</h1>
          <p className="text-[9px] tracking-[0.25em] text-[#8B0000] font-bold uppercase mt-0.5">✦ {CONFIG.SLOGAN} ✦</p>
        </div>
        <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          <button onClick={() => { setAbaAtiva('loja'); setEtapaCheckout('carrinho'); }} className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 ${abaAtiva === 'loja' ? 'border-[#8B0000] text-[#8B0000]' : 'border-transparent text-stone-500'}`}>Experiências</button>
          <button onClick={() => setAbaAtiva('sobre')} className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 ${abaAtiva === 'sobre' ? 'border-[#8B0000] text-[#8B0000]' : 'border-transparent text-stone-500'}`}>Nossa Filosofia</button>
          <button onClick={() => setAbaAtiva('carrinho')} className="flex items-center gap-3 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase border bg-white border-[#8B0000]/30 text-[#8B0000] shadow-sm">
            <span>Sacola ({totalItensNoCarrinho})</span>
          </button>
        </nav>
      </header>

      {/* VITRINE PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {abaAtiva === 'loja' && (
          <div>
            {/* HERO BANNER DE DESTAQUE */}
            <div className="mb-12 bg-gradient-to-br from-[#2D060B] via-[#1E0407] to-[#2D060B] text-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B0000]/60 relative">
              
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                
                {/* COLUNA ESQUERDA */}
                <div className="p-6 sm:p-10 md:col-span-7 flex flex-col justify-between gap-4 text-left relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">💖</span>
                      <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#E89CA0]">✦ EXPERIÊNCIA EM DESTAQUE ✦</span>
                    </div>

                    <h2 
                      className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-wide pb-2 mb-3 drop-shadow-md"
                      style={{
                        color: '#B22222',
                        backgroundImage: 'linear-gradient(135deg, #FF6B81 0%, #8B0000 50%, #4A000B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 8px rgba(139, 0, 0, 0.4))'
                      }}
                    >
                      {kitDestaqueAmor.nome}
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-4">
                      {kitDestaqueAmor.descricao}
                    </p>

                    {/* LISTA DOS ITENS INCLUSOS */}
                    <div className="bg-[#1A0306]/80 p-4 rounded-2xl border border-[#8B0000]/50 my-2 backdrop-blur-md">
                      <span className="text-[11px] uppercase font-bold tracking-widest text-[#E89CA0] block mb-2 flex items-center gap-1.5">
                        <span>✨</span> Itens que Acompanham a Experiência:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 font-light">
                        {kitDestaqueAmor.detalhes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#FF6B81]">✦</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Valor da Experiência Completa</span>
                      <span className="text-3xl font-black text-[#FF6B81]">
                        {CONFIG.MOEDA} 60,00
                      </span>
                    </div>

                    <button 
                      onClick={() => adicionarAoCarrinho(kitDestaqueAmor)}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#A00000] hover:to-[#C81E1E] text-white text-xs uppercase font-bold tracking-widest rounded-xl transition shadow-xl border border-[#FF6B81]/30 flex items-center justify-center gap-2"
                    >
                      <span>💖</span> <span>Garantir Meu Kit de Autocuidado</span>
                    </button>
                  </div>
                </div>

                {/* COLUNA DIREITA */}
                <div className="p-4 sm:p-6 md:col-span-5 flex flex-col justify-between items-center bg-[#0D0203] border-t md:border-t-0 md:border-l border-[#8B0000]/30 gap-4">
                  
                  <div className="w-full aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden relative border border-[#8B0000]/50 shadow-2xl bg-[#0A0102] flex items-center justify-center p-1 group">
                    <img 
                      src={ITENS_DESTAQUE[fotoAtivaIndex].foto} 
                      alt={ITENS_DESTAQUE[fotoAtivaIndex].nome} 
                      className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105" 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = ITENS_DESTAQUE[fotoAtivaIndex].fallback || IMAGEM_PADRAO_KIT; 
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0102] via-[#0A0102]/70 to-transparent p-4 text-center">
                      <span className="text-xs font-bold tracking-widest text-[#FF6B81] uppercase block drop-shadow-md">
                        {ITENS_DESTAQUE[fotoAtivaIndex].nome}
                      </span>
                    </div>
                  </div>
                  
                  {/* MINIATURAS INTERATIVAS */}
                  <div className="grid grid-cols-6 gap-2 w-full">
                    {ITENS_DESTAQUE.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFotoAtivaIndex(idx)}
                        title={item.nome}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition relative bg-[#0A0102] ${fotoAtivaIndex === idx ? 'border-[#FF6B81] scale-105 shadow-lg ring-2 ring-[#FF6B81]/30' : 'border-stone-800/80 opacity-50 hover:opacity-100'}`}
                      >
                        <img 
                          src={item.foto} 
                          alt={item.nome} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = item.fallback || IMAGEM_PADRAO_KIT; 
                          }} 
                        />
                      </button>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* SELETOR DE CATEGORIAS */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {CATEGORIAS.map(cat => (
                <button key={cat.id} onClick={() => setCategoriaSelecionada(cat.id)} className={`px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase border transition ${categoriaSelecionada === cat.id ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] shadow-md' : 'bg-white text-stone-600 border-[#E3DDD1]'}`}>
                  {cat.icone} {cat.nome}
                </button>
              ))}
            </div>
            <p className="text-xs italic text-stone-500 text-center max-w-2xl mx-auto mb-10 font-serif">"{metaCategoriaAtiva.slogan}"</p>

            {/* GRADE DE PRODUTOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {produtosFiltrados.map(prod => (
                <div key={prod.id} className="bg-white border border-[#E3DDD1] rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:shadow-xl transition group">
                  <div className="aspect-square bg-stone-100 overflow-hidden relative">
                    <img 
                      src={prod.imagem} 
                      alt={prod.nome} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = IMAGEM_PADRAO_KIT; 
                      }} 
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-4 justify-between flex-1">
                    <div>
                      <h4 className="font-serif font-black text-[#2C3E2B] text-base">{prod.nome}</h4>
                      <p className="text-stone-500 text-xs mt-2 line-clamp-3 font-light leading-relaxed">{prod.descricao}</p>
                    </div>
                    <div className="border-t border-stone-100 pt-3 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">Valor</span>
                        <span className="font-black text-[#8B0000] text-sm">{CONFIG.MOEDA} {prod.preco.toFixed(2)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider">
                        <button onClick={() => setIdProdutoVisualizar(prod.id)} className="py-2.5 bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-stone-700">Detalhes</button>
                        <button onClick={() => adicionarAoCarrinho(prod)} className="py-2.5 bg-[#2C3E2B] text-white rounded-lg hover:bg-[#8B0000] transition">Adicionar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANIFESTO / FILOSOFIA */}
        {abaAtiva === 'sobre' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#E3DDD1] rounded-2xl p-8 md:p-12 text-left shadow-sm">
            <h2 className="font-serif text-2xl text-center mb-6 text-[#2C3E2B] font-bold">{CONFIG.NOME_LOJA}</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-4">Nascemos da paixão pelas plantas, pela botânica e pelo bem-estar integrado. Acreditamos que momentos de cuidado pessoal — um chá calmo, um banho de ervas cheiroso, uma massagem com óleos naturais — têm o poder de renovar as nossas energias e trazer leveza à rotina agitada do dia a dia. Nossos produtos são 100% artesanais, feitos com ingredientes naturais selecionados e preparados com o carinho e a intenção de elevar a sua vibração.</p>
          </div>
        )}

        {/* SACOLA & CHECKOUT */}
        {abaAtiva === 'carrinho' && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E3DDD1] rounded-2xl p-6 shadow-md text-left">
            {etapaCheckout === 'carrinho' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide mb-2 text-[#8B0000] flex items-center gap-2">
                  <span>🌹</span> <span>Sua Sacola de Autocuidado</span>
                </h3>
                {carrinho.length === 0 ? <p className="text-xs text-stone-400 text-center py-8">Sua sacola está vazia.</p> : (
                  carrinho.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-[#FAF1EA]/40 p-4 rounded-xl border border-[#E3DDD1]">
                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#2C3E2B]">{item.nome}</h4>
                        <p className="text-[11px] text-[#8B0000] font-bold">{item.qtd}x — {CONFIG.MOEDA} {item.preco.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex border border-stone-300 rounded bg-white text-xs font-bold">
                          <button onClick={() => alterarQuantidadeItem(item.id, -1)} className="px-2.5 py-1">-</button>
                          <span className="px-2 py-1">{item.qtd}</span>
                          <button onClick={() => alterarQuantidadeItem(item.id, 1)} className="px-2.5 py-1">+</button>
                        </div>
                        <button onClick={() => removerDoCarrinhoDefinitivo(item.id, item.nome)} className="text-[10px] uppercase font-bold text-stone-400 hover:text-red-700">Remover</button>
                      </div>
                    </div>
                  ))
                )}

                {carrinho.length > 0 && (
                  <div className="border-t pt-4 flex flex-col gap-3 text-xs">
                    <form onSubmit={aplicarCupomDesconto} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Cupom de Desconto?" 
                        value={codigoCupom} 
                        onChange={e => setCodigoCupom(e.target.value)} 
                        className="border p-2 rounded text-xs uppercase flex-1 border-stone-300" 
                      />
                      <button type="submit" className="bg-[#8B0000] text-white px-4 py-2 rounded text-xs font-bold uppercase">Aplicar</button>
                    </form>
                    {erroCupom && <p className="text-[10px] text-red-600 font-bold">{erroCupom}</p>}
                    {cupomAplicado && <p className="text-[10px] text-emerald-700 font-bold">✨ Cupom {cupomAplicado.nome} ativado (-15%)</p>}

                    <div className="flex justify-between font-bold text-[#2C3E2B]"><span>Subtotal:</span><span>{CONFIG.MOEDA} {totalGeralProdutos.toFixed(2)}</span></div>
                    {cupomAplicado && (
                      <div className="flex justify-between text-emerald-700 font-bold"><span>Desconto:</span><span>-{CONFIG.MOEDA} {valorDescontoCupom.toFixed(2)}</span></div>
                    )}
                    <button onClick={() => setEtapaCheckout('dados')} className="w-full py-3 bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:bg-[#A00000]">Avançar para Envio</button>
                  </div>
                )}
              </div>
            )}

            {etapaCheckout === 'dados' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2C3E2B]">Dados para Envio</h3>
                <div className="grid grid-cols-2 gap-2"><input type="text" placeholder="Nome" value={dadosCliente.nome} onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})} className="border p-2 text-xs rounded" /><input type="text" placeholder="WhatsApp" value={dadosCliente.telefone} onChange={e => setDadosCliente({...dadosCliente, telefone: e.target.value})} className="border p-2 text-xs rounded" /></div>
                <input type="text" placeholder="CEP (apenas números)" maxLength="8" value={cep} onChange={processarLidagemCep} className="border p-2 text-xs rounded font-bold" />
                {carregandoCep && <p className="text-[10px] text-stone-400 animate-pulse">Buscando endereço...</p>}
                <input type="text" placeholder="Rua / Avenida" value={endereco.rua} onChange={e => setEndereco({...endereco, rua: e.target.value})} className="border p-2 text-xs rounded" />
                <input type="text" placeholder="Número" value={endereco.numero} onChange={e => setEndereco({...endereco, numero: e.target.value})} className="border p-2 text-xs rounded w-1/3" />
                <div className="flex gap-2"><button onClick={() => setEtapaCheckout('carrinho')} className="w-1/2 py-2 border text-xs rounded">Voltar</button><button onClick={() => { if(dadosCliente.nome && freteCalculado) setEtapaCheckout('revisao'); else alert('Preencha seu nome e um CEP válido.'); }} className="w-1/2 py-2 bg-[#8B0000] text-white text-xs rounded uppercase font-bold">Ver Resumo</button></div>
              </div>
            )}

            {etapaCheckout === 'revisao' && (
              <div className="flex flex-col gap-4 text-xs">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-center text-[#8B0000]">Finalização do Pedido</h3>
                <div className="bg-[#FAF8F5] p-4 rounded-xl border flex flex-col gap-2">
                  <p><strong>Cliente:</strong> {dadosCliente.nome} — {dadosCliente.telefone}</p>
                  <p><strong>Destino:</strong> {endereco.rua}, Nº {endereco.numero} — {endereco.cidade}/{endereco.estado}</p>
                  <p className="border-t pt-2 font-bold text-sm text-[#8B0000]">Total Geral com Frete: {CONFIG.MOEDA} {totalFinalComDescontosEFrete.toFixed(2)}</p>
                </div>
                <button onClick={dispararPedidoParaWhatsapp} className="w-full py-4 bg-[#8B0000] text-white text-xs uppercase tracking-widest font-bold rounded-lg shadow-md text-center">Enviar Pedido via WhatsApp</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL DETALHES */}
      {idProdutoVisualizar && produtoEmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto text-left flex flex-col gap-4 shadow-2xl border border-[#8B0000]/30">
            <button onClick={() => setIdProdutoVisualizar(null)} className="absolute top-4 right-4 text-stone-400 hover:text-black">✕</button>
            <h2 className="font-serif text-xl font-black text-[#2C3E2B]">{produtoEmModal.nome}</h2>
            <p className="text-xs text-stone-600 bg-[#FAF8F5] p-3 rounded-lg border font-light leading-relaxed">{produtoEmModal.descricao}</p>
            
            <div className="border-t pt-3">
              <h5 className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2">Composição & Ingredientes</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                {produtoEmModal.detalhes?.map((det, idx) => <div key={idx} className="bg-[#FAF1EA]/40 px-3 py-1.5 border rounded">✦ {det}</div>)}
              </div>
            </div>

            <button 
              onClick={() => { 
                adicionarAoCarrinho(produtoEmModal); 
                setIdProdutoVisualizar(null); 
              }} 
              className="w-full py-3 bg-[#8B0000] text-white text-xs uppercase font-bold tracking-wider rounded-lg mt-2 shadow-md hover:bg-[#A00000]"
            >
              Adicionar à Sacola — {CONFIG.MOEDA} {produtoEmModal.preco.toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
