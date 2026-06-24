// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';

// Importações amarradas exatamente com a extensão de cada arquivo do projeto
import { CONFIG, CATEGORIAS, PRODUTOS_MASTER } from './data/produtos.js';
import ProdutoCard from './components/ProdutoCard.jsx';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('loja');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [carrinho, setCarrinho] = useState([]);
  const [etapaCheckout, setEtapaCheckout] = useState('carrinho');
  const [idProdutoVisualizar, setIdProdutoVisualizar] = useState(null);

  // Estados de Logística
  const [cep, setCep] = useState('');
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');
  const [endereco, setEndereco] = useState({ rua: '', numero: '', bairro: '', cidade: '', estado: '', complemento: '' });
  const [dadosCliente, setDadosCliente] = useState({ nome: '', sobrenome: '', telefone: '', cpf: '' });
  const [frete, setFrete] = useState(0);
  const [freteCalculado, setFreteCalculado] = useState(false);

  // Contadores e Filtros Automatizados
  const totalGeral = useMemo(() => carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0), [carrinho]);
  const totalItensNoCarrinho = useMemo(() => carrinho.reduce((sum, item) => sum + item.qtd, 0), [carrinho]);
  
  const produtosFiltrados = useMemo(() => {
    if (categoriaSelecionada === 'todos') return PRODUTOS_MASTER;
    return PRODUTOS_MASTER.filter(p => p.categoria === categoriaSelecionada);
  }, [categoriaSelecionada]);

  const metaCategoriaAtiva = useMemo(() => CATEGORIAS.find(c => c.id === categoriaSelecionada), [categoriaSelecionada]);
  const produtoEmModal = useMemo(() => PRODUTOS_MASTER.find(p => p.id === idProdutoVisualizar) || null, [idProdutoVisualizar]);

  // Persistência local do carrinho
  useEffect(() => {
    const salvo = localStorage.getItem('botanica_sacola');
    if (salvo) { try { setCarrinho(JSON.parse(salvo)); } catch(e) { localStorage.removeItem('botanica_sacola'); } }
  }, []);

  const salvarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('botanica_sacola', JSON.stringify(novoCarrinho));
  };

  const adicionarAoCarrinho = (produto) => {
    const copia = [...carrinho];
    const existente = copia.find(item => item.id === produto.id);
    if (existente) existente.qtd += 1; else copia.push({ ...produto, qtd: 1 });
    salvarCarrinho(copia);
  };

  const alterarQuantidadeItem = (id, modificador) => {
    const atualizado = carrinho.map(item => {
      if (item.id === id) {
        const novaQtd = item.qtd + modificador;
        return novaQtd > 0 ? { ...item, qtd: novaQtd } : item;
      }
      return item;
    }).filter(item => item.qtd > 0);
    salvarCarrinho(atualizado);
  };

  // Função para remover um item específico do carrinho
  const removerDoCarrinho = (id) => {
    const carrinhoAtualizado = carrinho.filter(item => item.id !== id);
    salvarCarrinho(carrinhoAtualizado);
  };

  // Buscador automático de CEP Correios (ViaCEP)
  const lidarMudancaCep = async (e) => {
    const valorCru = e.target.value.replace(/\D/g, '');
    setCep(valorCru);
    erroCep && setErroCep('');

    if (valorCru.length === 8) {
      setCarregandoCep(true);
      setFreteCalculado(false);
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valorCru}/json/`);
        const dados = await resposta.json();
        if (dados.erro) {
          setErroCep('CEP não localizado nas bases dos Correios.');
          setEndereco(p => ({ ...p, rua: '', bairro: '', cidade: '', estado: '' }));
        } else {
          setEndereco(prev => ({
            ...prev,
            rua: dados.logradouro || '',
            bairro: dados.bairro || '',
            cidade: dados.localidade || '',
            estado: dados.uf || ''
          }));

          // TABELA DE FRETE REGIONAL
          const uf = dados.uf;
          let valorFrete = 25.00;

          if (['SP', 'RJ', 'MG', 'ES'].includes(uf)) {
            valorFrete = 18.00;
          } else if (['PR', 'SC', 'RS'].includes(uf)) {
            valorFrete = 22.00;
          }

          setFrete(valorFrete);
          setFreteCalculado(true);
        }
      } catch (err) {
        setErroCep('Falha ao conectar na API dos Correios.');
      } finally {
        setCarregandoCep(false);
      }
    }
  };

  // Conversor e estruturador de texto premium para o WhatsApp
  const processarDespachoWhatsapp = (e) => {
    e.preventDefault();
    if (!dadosCliente.nome.trim() || !endereco.rua.trim() || !endereco.numero.trim()) {
      alert('⚠️ Erro: Verifique os campos obrigatórios.');
      return;
    }

    let m = `🔮 *NOVO PEDIDO - ${CONFIG.NOME_LOJA}* 🔮\n`;
    m += `──────────────────────────────\n\n`;
    
    m += `👤 *DADOS DO COMPRADOR*\n`;
    m += `• *Nome:* ${dadosCliente.nome.toUpperCase()} ${dadosCliente.sobrenome.toUpperCase()}\n`;
    m += `• *Contato:* ${dadosCliente.telefone}\n\n`;

    m += `📦 *PRODUTOS SELECIONADOS*\n`;
    carrinho.forEach((item) => {
      m += `▪️ ${item.qtd}x _${item.nome}_ (${CONFIG.MOEDA} ${item.preco.toFixed(2)}/un)\n`;
    });
    m += `\n`;

    m += `🚚 *ENDEREÇO DE ENTREGA (CORREIOS)*\n`;
    m += `• *CEP:* ${cep}\n`;
    m += `• *Rua:* ${endereco.rua}, Nº ${endereco.numero}\n`;
    if (endereco.complemento.trim()) m += `• *Complemento:* ${endereco.complemento}\n`;
    m += `• *Bairro:* ${endereco.bairro}\n`;
    m += `• *Cidade/UF:* ${endereco.cidade} - ${endereco.estado}\n\n`;

    m += `──────────────────────────────\n`;
    m += `💰 *RESUMO DE VALORES*\n`;
    m += `• *Subtotal dos Itens:* ${CONFIG.MOEDA} ${totalGeral.toFixed(2)}\n`;
    m += `• *Frete (Correios):* ${CONFIG.MOEDA} ${frete.toFixed(2)}\n`;
    m += `• *TOTAL FINAL:* ${CONFIG.MOEDA} ${(totalGeral + frete).toFixed(2)}\n`;
    m += `──────────────────────────────\n\n`;
    
    m += `🙏🏼 _Saudações! Enviei meu pedido pelo site com o frete já incluso. Aguardo as instruções e a chave PIX para concluir o pagamento!_`;

    window.open(`https://api.whatsapp.com/send?phone=${CONFIG.TELEFONE_WHATSAPP}&text=${encodeURIComponent(m)}`, '_blank');
    salvarCarrinho([]);
    setEtapaCheckout('carrinho');
    setAbaAtiva('loja');
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-200 font-sans antialiased selection:bg-purple-950 selection:text-amber-200">
      
      {/* BARRA DE NAVEGAÇÃO SUPERIOR */}
      <header className="border-b border-purple-950/20 bg-[#070708]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300">
        <div className="text-center md:text-left cursor-pointer group" onClick={() => { setAbaAtiva('loja'); setEtapaCheckout('carrinho'); }}>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 font-medium transition duration-500 group-hover:brightness-125">
            {CONFIG.NOME_LOJA}
          </h1>
          <p className="text-[9px] tracking-[0.4em] text-purple-400/80 font-light uppercase mt-1.5">{CONFIG.SLOGAN}</p>
        </div>

        <nav className="flex items-center gap-8">
          <button 
            onClick={() => { setAbaAtiva('loja'); setEtapaCheckout('carrinho'); }}
            className={`text-[11px] uppercase tracking-[0.2em] font-medium pb-1 border-b transition-all duration-300 ${abaAtiva === 'loja' ? 'text-amber-300 border-amber-300' : 'text-neutral-500 border-transparent hover:text-neutral-200'}`}
          >
            Nossa Vitrine
          </button>
          
          <button 
            onClick={() => setAbaAtiva('carrinho')}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase border transition-all duration-300 ${abaAtiva === 'carrinho' ? 'bg-purple-950/30 border-purple-500 text-amber-200' : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'}`}
          >
            <span>Sacola Ritualística</span>
            <div className="w-5 h-5 rounded-full bg-gradient-to-b from-purple-600 to-indigo-700 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-purple-900/50">{totalItensNoCarrinho}</div>
          </button>
        </nav>
      </header>

      {/* RENDERIZADOR DAS PÁGINAS */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {abaAtiva === 'loja' && (
          <div>
            {/* Abas de Categorias Geradas Dinamicamente */}
            <div className="flex flex-wrap gap-2.5 justify-center mb-6">
              {CATEGORIAS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaSelecionada(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${categoriaSelecionada === cat.id ? 'bg-gradient-to-b from-purple-950/70 to-neutral-900 border-purple-500 text-amber-200 shadow-xl' : 'bg-neutral-900/40 border-neutral-800/60 text-neutral-400 hover:border-neutral-700'}`}
                >
                  <span>{cat.icone}</span>
                  <span>{cat.nome}</span>
                </button>
              ))}
            </div>

            <div className="text-center mb-12">
              <p className="text-xs italic text-neutral-500 max-w-md mx-auto">"{metaCategoriaAtiva ? metaCategoriaAtiva.slogan : ''}"</p>
            </div>

            {/* Grid Automático de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {produtosFiltrados.map(prod => (
                <ProdutoCard 
                  key={prod.id} 
                  produto={prod} 
                  moeda={CONFIG.MOEDA}
                  onAdicionar={adicionarAoCarrinho} 
                  onVisualizar={setIdProdutoVisualizar} 
                />
              ))}
            </div>
          </div>
        )}

        {/* ECOSSISTEMA DO CARRINHO */}
        {abaAtiva === 'carrinho' && (
          <div className="max-w-2xl mx-auto bg-[#0b0b0d] border border-neutral-900 rounded-3xl p-6 md:p-8 shadow-2xl">
            {etapaCheckout === 'carrinho' && (
              <div>
                <h2 className="font-serif text-xl text-amber-200 tracking-wide mb-6 border-b border-neutral-900 pb-3">🛒 Itens Separados</h2>
                {carrinho.length === 0 ? (
                  <div className="text-center py-10 flex flex-col items-center gap-4">
                    <p className="text-neutral-500 text-sm">Sua sacola ritualística está vazia.</p>
                    <button 
                      type="button"
                      onClick={() => {
                        setAbaAtiva('loja');
                        setEtapaCheckout('carrinho');
                      }}
                      className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-200 text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      Explorar a Vitrine
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {carrinho.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-neutral-950/50 p-4 rounded-xl border border-neutral-900 gap-4">
                        <div className="flex items-center gap-3">
                          <img src={item.imagem} alt={item.nome} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="text-left">
                            <h4 className="text-neutral-200 text-sm font-serif line-clamp-1">{item.nome}</h4>
                            <p className="text-neutral-500 text-[11px]">{CONFIG.MOEDA} {item.preco.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          {/* CONTROLE DE QUANTIDADE */}
                          <div className="flex items-center border border-neutral-800 bg-neutral-900 rounded-lg text-xs">
                            <button onClick={() => alterarQuantidadeItem(item.id, -1)} className="px-2 py-1 text-neutral-400 hover:text-neutral-200">-</button>
                            <span className="px-2 font-bold text-neutral-300">{item.qtd}</span>
                            <button onClick={() => alterarQuantidadeItem(item.id, 1)} className="px-2 py-1 text-neutral-400 hover:text-neutral-200">+</button>
                          </div>
                          
                          {/* PREÇO TOTAL DO ITEM */}
                          <span className="text-neutral-100 text-sm font-bold min-w-[70px] text-right">
                            {CONFIG.MOEDA} {(item.preco * item.qtd).toFixed(2)}
                          </span>

                          {/* BOTÃO REMOVER DEFINITIVO */}
                          <button
                            type="button"
                            onClick={() => removerDoCarrinho(item.id)}
                            className="text-[11px] uppercase tracking-wider text-red-400/50 hover:text-red-400 font-medium transition duration-300 pl-2 border-l border-neutral-800"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-neutral-900 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-center sm:text-left">
                        <span className="text-neutral-500 text-xs uppercase block mb-1">Subtotal</span>
                        <span className="text-2xl text-amber-300 font-serif font-bold">{CONFIG.MOEDA} {totalGeral.toFixed(2)}</span>
                      </div>
                      <button onClick={() => setEtapaCheckout('dados')} className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-800 to-indigo-950 text-white text-xs font-bold uppercase rounded-xl tracking-widest transition hover:brightness-110 shadow-lg shadow-purple-950/50">Avançar para Logística</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ETAPA DE LOGÍSTICA */}
            {etapaCheckout === 'dados' && (
              <form onSubmit={processarDespachoWhatsapp} className="flex flex-col gap-5 max-w-md mx-auto">
                <h2 className="font-serif text-xl text-amber-200 text-center">Dados de Despacho (Correios)</h2>
                <div className="grid grid-cols-2 gap-3">
                  <input required type="text" placeholder="Nome" value={dadosCliente.nome} onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                  <input required type="text" placeholder="Sobrenome" value={dadosCliente.sobrenome} onChange={e => setDadosCliente({...dadosCliente, sobrenome: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                </div>
                <input required type="tel" placeholder="WhatsApp (Com DDD)" value={dadosCliente.telefone} onChange={e => setDadosCliente({...dadosCliente, telefone: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                
                <div className="relative">
                  <input required type="text" maxLength="8" placeholder="CEP (Somente números)" value={cep} onChange={lidarMudancaCep} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-200 outline-none" />
                  {carregandoCep && <span className="absolute right-3 top-3 text-[10px] text-purple-400 animate-pulse">Buscando...</span>}
                </div>
                {erroCep && <p className="text-[10px] text-red-400">{erroCep}</p>}

                <input required type="text" placeholder="Rua / Logradouro" value={endereco.rua} onChange={e => setEndereco({...endereco, rua: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                <div className="grid grid-cols-3 gap-3">
                  <input required type="text" placeholder="Número" value={endereco.numero} onChange={e => setEndereco({...endereco, numero: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                  <input type="text" placeholder="Complemento" value={endereco.complemento} onChange={e => setEndereco({...endereco, complemento: e.target.value})} className="col-span-2 w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input required type="text" placeholder="Bairro" value={endereco.bairro} onChange={e => setEndereco({...endereco, bairro: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none" />
                  <input required type="text" placeholder="Cidade" value={endereco.cidade} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-400 outline-none" readOnly />
                  <input required type="text" placeholder="UF" value={endereco.estado} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl text-center py-2 text-xs text-neutral-400 outline-none" readOnly />
                </div>

                {freteCalculado && (
                  <div className="bg-neutral-950/60 border border-purple-950/40 p-4 rounded-xl mt-2 flex flex-col gap-2 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal dos Produtos:</span>
                      <span>{CONFIG.MOEDA} {totalGeral.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Envio ({endereco.estado}):</span>
                      <span className="text-amber-200/90 font-medium">+{CONFIG.MOEDA} {frete.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-purple-950/30 my-1 pt-2 flex justify-between text-sm font-serif font-bold">
                      <span className="text-neutral-300">Total com Frete:</span>
                      <span className="text-amber-300">{CONFIG.MOEDA} {(totalGeral + frete).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* DIV DOS BOTÕES */}
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setEtapaCheckout('carrinho')} className="flex-1 py-3 border border-neutral-800 text-neutral-400 text-xs font-semibold rounded-xl">Voltar</button>
                  <button type="submit" className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-950/40">Finalizar no WhatsApp</button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      {/* JANELA MODAL DE DETALHES DO PRODUTO */}
      {idProdutoVisualizar && produtoEmModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e10] border border-neutral-800 w-full max-w-xl rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto flex flex-col gap-6">
            <button onClick={() => setIdProdutoVisualizar(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-sm">✕</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img src={produtoEmModal.imagem} alt={produtoEmModal.nome} className="w-full h-48 object-cover rounded-2xl" />
              <div>
                <span className="text-[9px] uppercase tracking-widest bg-purple-950 text-amber-200 px-2 py-1 rounded border border-purple-800/30 font-bold inline-block mb-2">{produtoEmModal.categoria}</span>
                <h2 className="font-serif text-xl text-neutral-100 mb-2">{produtoEmModal.nome}</h2>
                <p className="text-amber-300 font-bold text-base mb-4">{CONFIG.MOEDA} {produtoEmModal.preco.toFixed(2)}</p>
                <p className="text-neutral-400 text-xs leading-relaxed">{produtoEmModal.descricao}</p>
              </div>
            </div>
            <div className="border-t border-neutral-900 pt-4">
              <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Propriedades Fitoenergéticas</h4>
              <ul className="flex flex-col gap-1.5">
                {produtoEmModal.detalhes.map((det, idx) => (
                  <li key={idx} className="text-xs text-neutral-500 flex items-center gap-2">
                    <span className="text-purple-500">✦</span> {det}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => { adicionarAoCarrinho(produtoEmModal); setIdProdutoVisualizar(null); }} className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition">Adicionar ao Carrinho</button>
          </div>
        </div>
      )}
    </div>
  );
}
