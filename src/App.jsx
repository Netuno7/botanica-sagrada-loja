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

// Emojis para representar cada categoria nos botões
const EMOJIS_CATEGORIAS = {
  'todos': '✨',
  'velas': '🕯️',
  'kits': '🎁',
  'banhos': '🌿',
  'oleos': '🧪',
  'chas': '🫖',
  'sais': '🧂',
  'amuletos': '🧿',
  'acessorios': '📿'
};

const ITENS_DESTAQUE = [
  {
    nome: "Kit Completo de Autocuidado",
    foto: "/produtos/kit-amor.jpeg",
    fallback: IMAGEM_PADRAO_KIT
  },
  {
    nome: "Banho Botânico: Amor e Magnetismo",
    foto: "/produtos/banho-amor.jpeg",
    fallback: IMAGEM_PADRAO_KIT
  },
  {
    nome: "Óleo Botânico: Amor e Atração",
    foto: "/produtos/oleo-amor.jpeg",
    fallback: IMAGEM_PADRAO_KIT
  },
  {
    nome: "Blend Natural: Chá de Amor e Autoestima",
    foto: "/produtos/cha-amor.jpeg",
    fallback: IMAGEM_PADRAO_KIT
  },
  {
    nome: "Sal Aromático: Amor e Sedução",
    foto: "/produtos/sal-amor.jpeg",
    fallback: IMAGEM_PADRAO_KIT
  },
  {
    nome: "Amuleto Botânico: Magnetismo e Intenção",
    foto: "/produtos/patua-amor.jpeg",
    fallback: IMAGEM_PADRAO_KIT
  }
];

// Depoimentos em Fotos (Prints de Avaliações)
const DEPOIMENTOS_FOTOS = [
  {
    id: 1,
    foto: "/assets/bsdp/bsdp1.png",
    alt: "Depoimento de Cliente 1"
  },
  {
    id: 2,
    foto: "/assets/bsdp/bsdp2.png",
    alt: "Depoimento de Cliente 2"
  },
  {
    id: 3,
    foto: "/assets/bsdp/bsdp3.png",
    alt: "Depoimento de Cliente 3"
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
  const [endereco, setEndereco] = useState({ 
    rua: '', 
    numero: '', 
    complemento: '', 
    bairro: '', 
    cidade: '', 
    estado: '' 
  });
  const [dadosCliente, setDadosCliente] = useState({ 
    nome: '', 
    sobrenome: '', 
    telefone: '', 
    cpf: '', 
    observacoes: '' 
  });
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
    setErroCep('');

    if (valorCru.length === 8) {
      setCarregandoCep(true);
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valorCru}/json/`);
        const dados = await resposta.json();
        if (!dados.erro) {
          setEndereco(p => ({ 
            ...p, 
            rua: dados.logradouro || '', 
            bairro: dados.bairro || '', 
            cidade: dados.localidade || '', 
            estado: dados.uf || '' 
          }));
          setFrete(dados.uf === 'SP' || dados.uf === 'SC' ? 15.00 : 25.00);
          setFreteCalculado(true);
        } else { 
          setErroCep('CEP não encontrado. Preencha os campos manualmente.'); 
          setFreteCalculado(true); 
        }
      } catch (err) { 
        setErroCep('Erro ao buscar o CEP. Digite o endereço manualmente.'); 
        setFreteCalculado(true); 
      } finally { 
        setCarregandoCep(false); 
      }
    }
  };

  const dispararPedidoParaWhatsapp = (e) => {
    e.preventDefault();
    let m = `🌿 *PEDIDO DE AUTOCUIDADO - ${CONFIG.NOME_LOJA}* 🌿\n\n_${CONFIG.SLOGAN}_\n\n`;
    m += `👤 *DESTINATÁRIO*\n`;
    m += `• *Nome:* ${dadosCliente.nome.toUpperCase()} ${dadosCliente.sobrenome.toUpperCase()}\n`;
    m += `• *CPF:* ${dadosCliente.cpf}\n`;
    m += `• *Contato:* ${dadosCliente.telefone}\n\n`;
    
    m += `📦 *ITENS SELECIONADOS*\n`;
    carrinho.forEach(item => m += `▪️ ${item.qtd}x _${item.nome}_ (${CONFIG.MOEDA} ${item.preco.toFixed(2)}/un)\n`);
    if (ganhaBrindeExtra) m += `🎁 *CORTESIA:* 1x _Amostra Especial de Mimo Botânico_\n`;
    
    m += `\n🚚 *ENDEREÇO DE ENTREGA*\n`;
    m += `• CEP: ${cep}\n`;
    m += `• Rua: ${endereco.rua}, Nº ${endereco.numero} ${endereco.complemento ? `(${endereco.complemento})` : ''}\n`;
    m += `• Bairro: ${endereco.bairro}\n`;
    m += `• Cidade/UF: ${endereco.cidade}/${endereco.estado.toUpperCase()}\n\n`;
    
    m += `💰 *RESUMO DO PEDIDO*\n`;
    m += `• Produtos: ${CONFIG.MOEDA} ${totalGeralProdutos.toFixed(2)}\n`;
    m += `• Frete: ${CONFIG.MOEDA} ${frete.toFixed(2)}\n`;
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
          <button onClick={() => setAbaAtiva('depoimentos')} className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 ${abaAtiva === 'depoimentos' ? 'border-[#8B0000] text-[#8B0000]' : 'border-transparent text-stone-500'}`}>Depoimentos</button>
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

                <div className="p-4 sm:p-6 md:col-span-5 flex flex-col justify-between items-center bg-[#0D0203] border-t md:border-t-0 md:border-l border-[#8B0000]/30 gap-4">
                  <div className="w-full aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden relative border border-[#8B0000]/50 shadow-2xl bg-[#0A0102] flex items-center justify-center p-1 group">
                    <img 
                      src={ITENS_DESTAQUE[fotoAtivaIndex].foto} 
                      alt={ITENS_DESTAQUE[fotoAtivaIndex].nome} 
                      className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105" 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = IMAGEM_PADRAO_KIT; 
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0102] via-[#0A0102]/70 to-transparent p-4 text-center">
                      <span className="text-xs font-bold tracking-widest text-[#FF6B81] uppercase block drop-shadow-md">
                        {ITENS_DESTAQUE[fotoAtivaIndex].nome}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5 w-full">
                    {ITENS_DESTAQUE.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFotoAtivaIndex(idx)}
                        title={item.nome}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition relative bg-[#0A0102] ${fotoAtivaIndex === idx ? 'border-[#FF6B81] scale-105 shadow-lg ring-2 ring-[#FF6B81]/30' : 'border-stone-800/80 opacity-50 hover:opacity-100'}`}
                      >
                        <img 
                          src={item.foto} 
                          alt={item.nome} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = IMAGEM_PADRAO_KIT; 
                          }} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES DE CATEGORIAS ESTILO PILLS */}
            <div className="mb-10 w-full">
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-2">
                {CATEGORIAS.map(cat => {
                  const estaAtivo = categoriaSelecionada === cat.id;
                  const emojiCategoria = EMOJIS_CATEGORIAS[cat.id] || '🌿';

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaSelecionada(cat.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm border ${
                        estaAtivo 
                          ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md scale-105 ring-2 ring-[#8B0000]/20' 
                          : 'bg-white text-stone-700 border-stone-300 hover:border-[#8B0000]/60 hover:text-[#8B0000] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span className="text-sm">{emojiCategoria}</span>
                      <span>{cat.nome}</span>
                    </button>
                  );
                })}
              </div>
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

        {/* DEPOIMENTOS (FOTOS) */}
        {abaAtiva === 'depoimentos' && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-[#2C3E2B] mb-2">Relatos & Depoimentos</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8B0000] font-bold">✦ O carinho de quem viveu a experiência Botânica Sagrada ✦</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEPOIMENTOS_FOTOS.map(dep => (
                <div key={dep.id} className="bg-white border border-[#E3DDD1] rounded-2xl p-3 shadow-sm overflow-hidden group">
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 relative">
                    <img 
                      src={dep.foto} 
                      alt={dep.alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = IMAGEM_PADRAO_KIT;
                      }}
                    />
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

            {/* FORMULÁRIO COMPLETO DE DADOS PARA ENVIO */}
            {etapaCheckout === 'dados' && (
              <div className="flex flex-col gap-3 text-xs">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2C3E2B] mb-1">
                  Dados de Entrega e Identificação
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Nome" 
                    value={dadosCliente.nome} 
                    onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                  />
                  <input 
                    type="text" 
                    placeholder="Sobrenome" 
                    value={dadosCliente.sobrenome} 
                    onChange={e => setDadosCliente({...dadosCliente, sobrenome: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="WhatsApp / Contato" 
                    value={dadosCliente.telefone} 
                    onChange={e => setDadosCliente({...dadosCliente, telefone: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                  />
                  <input 
                    type="text" 
                    placeholder="CPF (apenas números)" 
                    value={dadosCliente.cpf} 
                    onChange={e => setDadosCliente({...dadosCliente, cpf: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                  />
                </div>

                <div className="border-t border-stone-200 my-1 pt-2">
                  <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">Endereço de Despacho</label>
                  <input 
                    type="text" 
                    placeholder="CEP (apenas 8 números)" 
                    maxLength="8" 
                    value={cep} 
                    onChange={processarLidagemCep} 
                    className="border p-2.5 rounded font-bold border-stone-300 w-full focus:outline-[#8B0000]" 
                  />
                  {carregandoCep && <p className="text-[10px] text-amber-700 animate-pulse mt-1">Buscando endereço via ViaCEP...</p>}
                  {erroCep && <p className="text-[10px] text-red-600 mt-1 font-bold">{erroCep}</p>}
                </div>

                <input 
                  type="text" 
                  placeholder="Rua / Logradouro" 
                  value={endereco.rua} 
                  onChange={e => setEndereco({...endereco, rua: e.target.value})} 
                  className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                />

                <div className="grid grid-cols-3 gap-2">
                  <input 
                    type="text" 
                    placeholder="Número" 
                    value={endereco.numero} 
                    onChange={e => setEndereco({...endereco, numero: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 col-span-1 focus:outline-[#8B0000]" 
                  />
                  <input 
                    type="text" 
                    placeholder="Complemento (Apto, Bloco)" 
                    value={endereco.complemento} 
                    onChange={e => setEndereco({...endereco, complemento: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 col-span-2 focus:outline-[#8B0000]" 
                  />
                </div>

                <input 
                  type="text" 
                  placeholder="Bairro" 
                  value={endereco.bairro} 
                  onChange={e => setEndereco({...endereco, bairro: e.target.value})} 
                  className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                />

                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Cidade" 
                    value={endereco.cidade} 
                    onChange={e => setEndereco({...endereco, cidade: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                  />
                  <input 
                    type="text" 
                    placeholder="Estado (UF)" 
                    maxLength="2" 
                    value={endereco.estado} 
                    onChange={e => setEndereco({...endereco, estado: e.target.value})} 
                    className="border p-2.5 rounded border-stone-300 focus:outline-[#8B0000]" 
                  />
                </div>

                {freteCalculado && (
                  <div className="bg-[#FAF8F5] p-3 rounded border border-stone-200 mt-2 flex justify-between items-center">
                    <span className="font-bold text-stone-700">Frete Calculado:</span>
                    <span className="font-black text-[#8B0000]">{CONFIG.MOEDA} {frete.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button onClick={() => setEtapaCheckout('carrinho')} className="px-4 py-2.5 border border-stone-300 rounded font-bold text-stone-600">Voltar</button>
                  <button onClick={dispararPedidoParaWhatsapp} className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold uppercase tracking-wider">Enviar Pedido via WhatsApp</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
