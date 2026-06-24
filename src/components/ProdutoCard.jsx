// src/components/ProdutoCard.jsx
import React from 'react';

export default function ProdutoCard({ produto, onAdicionar, onVisualizar, moeda }) {
  return (
    <div className="bg-[#0b0b0d] rounded-2xl border border-neutral-900 overflow-hidden flex flex-col justify-between p-4 gap-4 hover:border-purple-900/50 hover:shadow-2xl hover:shadow-purple-950/10 transition-all duration-300 group">
      
      {/* Container de Imagem */}
      <div className="h-52 w-full bg-neutral-900 rounded-xl overflow-hidden relative">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-neutral-800 px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold text-purple-300 tracking-wider">
          {produto.categoria}
        </div>
      </div>

      {/* Conteúdo de Textos */}
      <div className="flex flex-col flex-grow justify-between gap-1">
        <div>
          <h3 className="font-serif text-base text-neutral-100 tracking-wide mb-1.5 group-hover:text-amber-200 transition-colors line-clamp-1">
            {produto.nome}
          </h3>
          <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
            {produto.descricao}
          </p>
        </div>

        {/* Rodapé Interno do Card - Informações de Preço */}
        <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-end">
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">Produto</span>
            <span className="text-base text-amber-300 font-bold">{moeda} {produto.preco.toFixed(2)}</span>
          </div>
        </div>

        {/* Botões de Ação Empilhados */}
        <div className="flex flex-col gap-2 mt-3">
          <button 
            type="button"
            onClick={() => onVisualizar(produto.id)}
            className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs uppercase tracking-wider rounded-xl transition duration-300"
          >
            Ver Produto
          </button>
          
          <button 
            type="button"
            onClick={() => onAdicionar(produto)}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-amber-950/20 active:scale-[0.98]"
          >
            Adicionar Produto
          </button>
        </div>
      </div>

    </div>
  );
}