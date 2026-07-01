// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';
// Importação isolada dos seus dados reais (evita o erro de HMR / Fast Refresh)
import { CONFIG, CATEGORIAS, PRODUTOS_MASTER } from './data/produtos';

const DEPOIMENTOS = [
  { id: 1, nome: "Clarice Albuquerque", texto: "O banho de Amor e Magnetismo é maravilhoso. O cuidado com as folhas inteiras demonstra o respeito da marca pela natureza.", local: "São Paulo - SP", estrelas: 5 },
  { id: 2, nome: "Matheus Dorneles", texto: "A vela de lavanda pura mudou a energia do meu ambiente. O aroma é natural e traz uma paz imediata.", local: "Curitiba - PR", estrelas: 5 },
  { id: 3, nome: "Helena Cavalcanti", texto: "Os óleos ritualísticos possuem uma textura incrível. Sinto o campo blindado e a mente calma após o uso nos chakras.", local: "Rio de Janeiro - RJ", estrelas: 5 }
];

const CUPONS_VALIDOS = {
  'BOTANICA10': 0.10, 
  'SAGRADO15': 0.15 
};

const VALOR_MINIMO_BRINDE = 200.00;

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

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSucesso, setNewsletterSucesso] = useState(false);
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(null);

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
      base = base.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.descricao.toLowerCase().includes(termo)
      );
    }

    if (ordenacao === 'menor-preco') {
      base.sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'maior-preco') {
      base.sort((a, b) => b.preco - a.preco);
    } else if (ordenacao === 'alfabetica') {
      base.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return base;
  }, [categoriaSelecionada, buscaTermo, ordenacao]);

  const totalGeralProdutos = useMemo(() => {
    return carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
  }, [carrinho]);

  const valorDescontoCupom = useMemo(() => {
    if (!cupomAplicado) return 0;
    if (cupomAplicado.tipo === 'porcentagem') return totalGeralProdutos * cupomAplicado.valor;
    return 0;
  }, [cupomAplicado, totalGeralProdutos]);

  const ganhaBrindeExtra = useMemo(() => totalGeralProdutos >= VALOR_MINIMO_BRINDE, [totalGeralProdutos]);
  const totalFinalComDescontosEFrete = useMemo(() => Math.max(0, totalGeralProdutos - valorDescontoCupom + frete), [totalGeralProdutos, valorDescontoCupom, frete]);
  const totalItensNoCarrinho = useMemo(() => carrinho.reduce((sum, item) => sum + item.qtd, 0), [carrinho]);
  const metaCategoriaAtiva = useMemo(() => CATEGORIAS.find(c => c.id === categoriaSelecionada) || CATEGORIAS[0], [categoriaSelecionada]);
  const produtoEmModal = useMemo(() => PRODUTOS_MASTER.find(p => p.id === idProdutoVisualizar) || null, [idProdutoVisualizar]);

  const atualizarEPersistirCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('botanica_cart', JSON.stringify(novoCarrinho));
  };

  const adicionarAoCarrinho = (produto) => {
    const copia = [...carrinho];
    const existente = copia.find(item => item.id === produto.id);
    if (existente) { existente.qtd += 1; } else { copia.push({ ...produto, qtd: 1 }); }
    atualizarEPersistirCarrinho(copia);
    dispararNotificacao(`🌿 "${produto.nome}" foi colhido e reservado na sua sacola.`);
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
    dispararNotificacao(`💼 "${nome}" removido do seu ritual.`);
  };

  const aplicarCupomDesconto = (e) => {
    e.preventDefault();
    setErroCupom('');
    const cupomTratado = codigoCupom.trim().toUpperCase();
    if (CUPONS_VALIDOS.hasOwnProperty(cupomTratado)) {
      setCupomAplicado({ nome: cupomTratado, valor: CUPONS_VALIDOS[cupomTratado], tipo: 'porcentagem' });
      dispararNotificacao(`✨ Cupom "${cupomTratado}" ativado.`);
    } else {
      setErroCupom('Código botânico inválido.');
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
    let m = `🌿 *PEDIDO RITUAL - ${CONFIG.NOME_LOJA}* 🌿\n_${CONFIG.SLOGAN}_\n\n`;
    m += `👤 *DESTINATÁRIO*\n• *Nome:* ${dadosCliente.nome.toUpperCase()} ${dadosCliente.sobrenome.toUpperCase()}\n• *Contato:* ${dadosCliente.telefone}\n\n`;
    m += `📦 *ITENS CONECTADOS*\n`;
    carrinho.forEach(item => m += `▪️ ${item.qtd}x _${item.nome}_ (${CONFIG.MOEDA} ${item.preco.toFixed(2)}/un)\n`);
    if (ganhaBrindeExtra) m += `🎁 *CORTESIA:* 1x _Amostra de Alquimia de Estúdio_\n`;
    m += `\n🚚 *ENDEREÇO*\n• ${endereco.rua}, Nº ${endereco.numero} - ${endereco.bairro}\n• ${endereco.cidade}/${endereco.estado} - CEP: ${cep}\n\n`;
    m += `💰 *EXTRATO*\n• Produtos: ${CONFIG.MOEDA} ${totalGeralProdutos.toFixed(2)}\n• Frete: ${CONFIG.MOEDA} ${frete.toFixed(2)}\n`;
    if (cupomAplicado) m += `• Desconto: -${CONFIG.MOEDA} ${valorDescontoCupom.toFixed(2)}\n`;
    m += `• *TOTAL FINAL:* ${CONFIG.MOEDA} ${totalFinalComDescontosEFrete.toFixed(2)}\n`;
    window.open(`https://api.whatsapp.com/send?phone=${CONFIG.TELEFONE_WHATSAPP}&text=${encodeURIComponent(m)}`, '_blank');
    atualizarEPersistirCarrinho([]);
    setEtapaCheckout('carrinho');
    setAbaAtiva('loja');
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2C3E2B] font-sans antialiased">
      {notificacaoAtiva && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C3E2B] text-[#FAF8F5] border border-[#D4AF37]/40 px-6 py-4 rounded-xl shadow-2xl text-xs tracking-wider">
          <span>🌿</span> {notificacaoAtiva}
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-[#E3DDD1] bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="text-center lg:text-left cursor-pointer" onClick={() => { setAbaAtiva('loja'); setEtapaCheckout('carrinho'); }}>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-black">{CONFIG.NOME_LOJA}</h1>
          <p className="text-[9px] tracking-[0.25em] text-[#2C3E2B]/70 font-bold uppercase mt-1">✦ {CONFIG.SLOGAN} ✦</p>
        </div>
        <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          <button onClick={() => { setAbaAtiva('loja'); setEtapaCheckout('carrinho'); }} className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 ${abaAtiva === 'loja' ? 'border-[#D4AF37]' : 'border-transparent text-stone-400'}`}>Sinergias</button>
          <button onClick={() => setAbaAtiva('sobre')} className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 ${abaAtiva === 'sobre' ? 'border-[#D4AF37]' : 'border-transparent text-stone-400'}`}>Nossa Tradição</button>
          <button onClick={() => setAbaAtiva('depoimentos')} className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 ${abaAtiva === 'depoimentos' ? 'border-[#D4AF37]' : 'border-transparent text-stone-400'}`}>Relatos</button>
          <button onClick={() => setAbaAtiva('carrinho')} className="flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold tracking-[0.18em] uppercase border bg-white border-[#D6CFC2]">
            <span>Sacola ({totalItensNoCarrinho})</span>
          </button>
        </nav>
      </header>

      {/* VITRINE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {abaAtiva === 'loja' && (
          <div>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {CATEGORIAS.map(cat => (
                <button key={cat.id} onClick={() => setCategoriaSelecionada(cat.id)} className={`px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase border transition ${categoriaSelecionada === cat.id ? 'bg-[#2C3E2B] text-white' : 'bg-white text-stone-600'}`}>
                  {cat.icone} {cat.nome}
                </button>
              ))}
            </div>
            <p className="text-xs italic text-stone-500 text-center max-w-2xl mx-auto mb-12 font-serif">"{metaCategoriaAtiva.slogan}"</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {produtosFiltrados.map(prod => (
                <div key={prod.id} className="bg-white border border-[#E3DDD1] rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:shadow-lg transition">
                  <div className="aspect-square bg-stone-100 overflow-hidden relative">
                    <img src={prod.imagem} alt={prod.nome} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400' }} />
                  </div>
                  <div className="p-6 flex flex-col gap-4 justify-between flex-1">
                    <div>
                      <h4 className="font-serif font-black text-[#2C3E2B] text-base">{prod.nome}</h4>
                      <p className="text-stone-500 text-xs mt-2 line-clamp-3 font-light leading-relaxed">{prod.descricao}</p>
                    </div>
                    <div className="border-t border-stone-100 pt-3 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">Troca</span>
                        <span className="font-black text-[#2C3E2B]">{CONFIG.MOEDA} {prod.preco.toFixed(2)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider">
                        <button onClick={() => setIdProdutoVisualizar(prod.id)} className="py-2 bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg">Detalhes</button>
                        <button onClick={() => adicionarAoCarrinho(prod)} className="py-2 bg-[#2C3E2B] text-white rounded-lg">Adicionar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANIFESTO / SOBRE */}
        {abaAtiva === 'sobre' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#E3DDD1] rounded-2xl p-8 md:p-12 text-left">
            <h2 className="font-serif text-2xl text-center mb-6">{CONFIG.NOME_LOJA}</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-4">Nascemos da profunda conexão com o reino vegetal e a tradição ervanária, trazendo a cura sutil e a purificação energética para rituais diários através de elementos feitos de forma 100% artesanal, natural e intencionada.</p>
          </div>
        )}

        {/* DEPOIMENTOS */}
        {abaAtiva === 'depoimentos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {DEPOIMENTOS.map(dep => (
              <div key={dep.id} className="bg-white border border-[#E3DDD1] rounded-2xl p-6 text-left flex flex-col justify-between">
                <p className="text-xs text-stone-600 italic font-light">"{dep.texto}"</p>
                <h5 className="font-serif text-xs font-bold mt-4 uppercase tracking-wider text-[#2C3E2B]">{dep.nome} <span className="text-stone-400 text-[10px] block font-sans">{dep.local}</span></h5>
              </div>
            ))}
          </div>
        )}

        {/* SACOLA & CHECKOUT */}
        {abaAtiva === 'carrinho' && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E3DDD1] rounded-2xl p-6 shadow-md text-left">
            {etapaCheckout === 'carrinho' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide mb-2">Seus Artefatos</h3>
                {carrinho.length === 0 ? <p className="text-xs text-stone-400 text-center py-8">Sua sacola está vazia.</p> : (
                  carrinho.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-[#FAF1EA]/40 p-4 rounded-xl border border-[#E3DDD1]">
                      <div>
                        <h4 className="font-serif font-bold text-xs">{item.nome}</h4>
                        <p className="text-[11px] text-stone-500">{item.qtd}x — {CONFIG.MOEDA} {item.preco.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex border border-stone-300 rounded bg-white text-xs font-bold">
                          <button onClick={() => alterarQuantidadeItem(item.id, -1)} className="px-2 py-0.5">-</button>
                          <span className="px-2 py-0.5">{item.qtd}</span>
                          <button onClick={() => alterarQuantidadeItem(item.id, 1)} className="px-2 py-0.5">+</button>
                        </div>
                        <button onClick={() => removerDoCarrinhoDefinitivo(item.id, item.nome)} className="text-[10px] uppercase font-bold text-stone-400 hover:text-red-700">Remover</button>
                      </div>
                    </div>
                  ))
                )}
                {carrinho.length > 0 && (
                  <div className="border-t pt-4 flex flex-col gap-3 text-xs">
                    <div className="flex justify-between font-bold text-[#2C3E2B]"><span>Total em Produtos:</span><span>{CONFIG.MOEDA} {totalGeralProdutos.toFixed(2)}</span></div>
                    <button onClick={() => setEtapaCheckout('dados')} className="w-full py-3 bg-[#2C3E2B] text-white text-xs font-bold uppercase tracking-widest rounded-lg">Avançar para Despacho</button>
                  </div>
                )}
              </div>
            )}

            {etapaCheckout === 'dados' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide">Despacho e Dados</h3>
                <div className="grid grid-cols-2 gap-2"><input type="text" placeholder="Nome" value={dadosCliente.nome} onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})} className="border p-2 text-xs rounded" /><input type="text" placeholder="WhatsApp" value={dadosCliente.telefone} onChange={e => setDadosCliente({...dadosCliente, telefone: e.target.value})} className="border p-2 text-xs rounded" /></div>
                <input type="text" placeholder="CEP (apenas números)" maxLength="8" value={cep} onChange={processarLidagemCep} className="border p-2 text-xs rounded font-bold" />
                {carregandoCep && <p className="text-[10px] text-stone-400 animate-pulse">Buscando endereço...</p>}
                <input type="text" placeholder="Rua / Avenida" value={endereco.rua} onChange={e => setEndereco({...endereco, rua: e.target.value})} className="border p-2 text-xs rounded" />
                <input type="text" placeholder="Número" value={endereco.numero} onChange={e => setEndereco({...endereco, numero: e.target.value})} className="border p-2 text-xs rounded w-1/3" />
                <div className="flex gap-2"><button onClick={() => setEtapaCheckout('carrinho')} className="w-1/2 py-2 border text-xs rounded">Voltar</button><button onClick={() => { if(dadosCliente.nome && freteCalculado) setEtapaCheckout('revisao'); else alert('Preencha seu nome e um CEP válido.'); }} className="w-1/2 py-2 bg-[#2C3E2B] text-white text-xs rounded uppercase font-bold">Ver Resumo</button></div>
              </div>
            )}

            {etapaCheckout === 'revisao' && (
              <div className="flex flex-col gap-4 text-xs">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-center">Conclusão do Ritual</h3>
                <div className="bg-[#FAF8F5] p-4 rounded-xl border flex flex-col gap-2">
                  <p><strong>Guardião:</strong> {dadosCliente.nome} — {dadosCliente.telefone}</p>
                  <p><strong>Destino:</strong> {endereco.rua}, Nº {endereco.numero} — {endereco.cidade}/{endereco.estado}</p>
                  <p className="border-t pt-2 font-bold text-sm text-[#2C3E2B]">Total Geral com Frete: {CONFIG.MOEDA} {totalFinalComDescontosEFrete.toFixed(2)}</p>
                </div>
                <button onClick={dispararPedidoParaWhatsapp} className="w-full py-4 bg-[#2C3E2B] text-white text-xs uppercase tracking-widest font-bold rounded-lg shadow-md text-center">Enviar Pedido via WhatsApp</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL DETALHES */}
      {idProdutoVisualizar && produtoEmModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto text-left flex flex-col gap-4 shadow-2xl">
            <button onClick={() => setIdProdutoVisualizar(null)} className="absolute top-4 right-4 text-stone-400 hover:text-black">✕</button>
            <h2 className="font-serif text-xl font-black text-[#2C3E2B]">{produtoEmModal.nome}</h2>
            <p className="text-xs text-stone-600 bg-[#FAF8F5] p-3 rounded-lg border font-light leading-relaxed">{produtoEmModal.descricao}</p>
            <div className="border-t pt-3">
              <h5 className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2">Composição & Atributos</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                {produtoEmModal.detalhes.map((det, idx) => <div key={idx} className="bg-[#FAF1EA]/40 px-3 py-1.5 border rounded">✦ {det}</div>)}
              </div>
            </div>
            <button onClick={() => { adicionarAoCarrinho(produtoEmModal); setIdProdutoVisualizar(null); }} className="w-full py-3 bg-[#2C3E2B] text-white text-xs uppercase font-bold tracking-wider rounded-lg mt-2">Adicionar à Sacola — {CONFIG.MOEDA} {produtoEmModal.preco.toFixed(2)}</button>
          </div>
        </div>
      )}
    </div>
  );
}
