// src/data/produtos.js

export const CONFIG = {
  TELEFONE_WHATSAPP: "554797002521",
  NOME_LOJA: "BOTÂNICA SAGRADA",
  SLOGAN: "ERVANARIA NATURAL, AUTOCUIDADO & BEM-ESTAR",
  MOEDA: "R$"
};

export const CATEGORIAS = [
  { id: 'todos', nome: 'Ver Tudo', icone: '✨', slogan: 'Explore todos os produtos para o seu cuidado diário.' },
  { id: 'velas', nome: 'Velas Aromáticas', icone: '🕯️', slogan: 'Velas artesanais para criar momentos de aconchego e intenção.' },
  { id: 'chas', nome: 'Chás & Infusões', icone: '🫖', slogan: 'Blends para aconchego interno, leveza e pausa na rotina.' },
  { id: 'oleos', nome: 'Óleos Botânicos', icone: '🧪', slogan: 'Macerados naturais para hidratação, automassagem e relaxamento.' },
  { id: 'patuas', nome: 'Amuletos Botânicos', icone: '🧿', slogan: 'Peças artesanais para trazer boas vibrações e proteção ao seu dia.' },
  { id: 'banhos', nome: 'Banhos de Ervas', icone: '🌿', slogan: 'Renovação sutil, frescor e relaxamento para o corpo e a mente.' },
  { id: 'sal-ritualistico', nome: 'Sais Aromáticos', icone: '🧂', slogan: 'Sais de banho e esfoliação para purificação e equilíbrio.' },
  { id: 'kits', nome: 'Kits de Autocuidado', icone: '🎁', slogan: 'Experiências completas para momentos especiais de pausa.' },
  { id: 'guias', nome: 'Acessórios & Japamalas', icone: '📿', slogan: 'Peças especiais para ancorar sua intenção e prática de presença.' }
];

export const PRODUTOS_MASTER = [
  // ==========================================
  // --- CATEGORIA: VELAS ---
  // ==========================================
  {
    id: 101,
    nome: 'Vela de Amor: Autoestima e Brilho Pessoal',
    categoria: 'velas',
    preco: 15.00,
    imagem: '/produtos/vela-amor.png',
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com tons vivos e com acabamento detalhado. Desenvolvida para criar um clima de carinho, despertar o amor-próprio e elevar o seu brilho pessoal.',
    detalhes: ['Tempo de queima estimado: 3h', 'Cor: Vermelho Intenso', 'Peso: 40g']
  },
  {
    id: 102,
    nome: 'Vela Botânica: Lavanda Rosa',
    categoria: 'velas',
    preco: 30.00,
    imagem: '/produtos/vela-lavanda-rosa.png',
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, em recipiente de vidro elegante. Traz um aroma suave para acolher suas emoções e promover harmonia no ambiente.',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Rosa Suave', 'Peso: 120g', 'Aroma: Lavanda']
  },
  {
    id: 103,
    nome: 'Vela Botânica: Lavanda Pura',
    categoria: 'velas',
    preco: 30.00,
    imagem: '/produtos/vela-lavanda.png',
    descricao: 'Feita artesanalmente em recipiente de vidro com design minimalista. Ideal para momentos de meditação, leitura ou descanso, trazendo paz e serenidade ao espaço.',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Branco', 'Peso: 120g', 'Aroma: Lavanda']
  },
  {
    id: 104,
    nome: 'Vela Botânica: Canela Prosperidade',
    categoria: 'velas',
    preco: 30.00,
    imagem: '/produtos/vela-canela.png',
    descricao: 'Aromatizada com a energia estimulante da canela, esta vela aquecedora ajuda a despertar a motivação, o foco e o entusiasmo na sua rotina.',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Laranja', 'Peso: 120g', 'Aroma: Canela']
  },

  // ==========================================
  // --- CATEGORIA: CHÁS ---
  // ==========================================
  {
    id: 201,
    nome: 'Blend Natural: Chá de Amor e Autoestima',
    categoria: 'chas',
    preco: 10.00,
    imagem: '/produtos/cha-amor.jpeg',
    descricao: 'Uma infusão suave de ervas selecionadas para acolher os sentimentos, proporcionar momentos de pausa e fortalecer a autoaceitação.',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Hibisco, Artemísia, Manjericão', 'Rende aproximadamente 3 xícaras']
  },
  {
    id: 202,
    nome: 'Blend Natural: Chá de Prosperidade e Entusiasmo',
    categoria: 'chas',
    preco: 10.00,
    imagem: '/produtos/cha-prosperidade.png',
    descricao: 'Uma infusão especiada e estimulante criada para renovar o ânimo, clarear a mente e trazer uma sensação de abundância ao seu dia.',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Canela, Alecrim, Louro', 'Rende aproximadamente 3 xícaras']
  },
  {
    id: 203,
    nome: 'Blend Natural: Chá de Purificação e Renovação',
    categoria: 'chas',
    preco: 10.00,
    imagem: '/produtos/cha-protecao.jpg',
    descricao: 'Uma infusão herbal refrescante formulada para ajudar a desacelerar a mente, proporcionando alívio e leveza para o corpo.',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Arruda, Sálvia, Eucalipto', 'Rende aproximadamente 3 xícaras']
  },

  // ==========================================
  // --- CATEGORIA: ÓLEOS ---
  // ==========================================
  {
    id: 301,
    nome: 'Óleo Botânico: Sucesso e Vitalidade',
    categoria: 'oleos',
    preco: 15.00,
    imagem: '/produtos/oleo-prosperidade.png',
    descricao: 'Óleo corporal enriquecido, formulado em uma base pura de Óleo Natural de Girassol com ervas estimulantes que trazem a energia radiante do Sol.',
    detalhes: ['Volume: 20ml', '100% Natural', 'Ervas: Canela, Laranja, Maçã e Alecrim', 'Livre de conservantes ou fragrâncias sintéticas']
  },
  {
    id: 302,
    nome: 'Óleo Botânico: Amor e Nutrição',
    categoria: 'oleos',
    preco: 15.00,
    imagem: '/produtos/oleo-amor.jpeg',
    descricao: 'Um elixir corporal suave formulado com Óleo de Amêndoas Doces puro e botânicos selecionados. Perfeito para hidratação intensa e automassagem.',
    detalhes: ['Base 100% natural de Amêndoas Doces', 'Infundido com pétalas e folhas naturais', 'Ideal para usar pós-banho ou em massagens']
  },
  {
    id: 303,
    nome: 'Óleo Botânico: Equilíbrio e Proteção',
    categoria: 'oleos',
    preco: 15.00,
    imagem: '/produtos/oleo-protecao.jpg',
    descricao: 'Óleo de toque leve formulado em base de Semente de Uva. Traz o aroma revigorante do eucalipto e da sálvia para criar um momento de alívio e bem-estar.',
    detalhes: ['Base 100% natural de Semente de Uva', 'Macerado com Arruda, Sálvia e Eucalipto', 'Ideal para aplicar nos pulsos, nuca e têmporas']
  },

  // ==========================================
  // --- CATEGORIA: BANHOS ---
  // ==========================================
  {
    id: 403,
    nome: 'Banho Botânico: Amor e Autoestima',
    categoria: 'banhos',
    preco: 10.00,
    imagem: '/produtos/banho-amor.jpeg',
    descricao: 'Uma seleção de ervas florais e aromáticas perfeita para um banho relaxante, promovendo a reconexão com o seu amor-próprio.',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Hibisco, Artemísia e Manjericão']
  },
  {
    id: 404,
    nome: 'Banho Botânico: Prosperidade e Leveza',
    categoria: 'banhos',
    preco: 10.00,
    imagem: '/produtos/banho-prosperidade.png',
    descricao: 'Uma combinação herbal revigorante desenhada para renovar as energias, espantar o cansaço e trazer otimismo.',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Alecrim, Canela e Louro']
  },
  {
    id: 405,
    nome: 'Banho Botânico: Limpeza e Frescor',
    categoria: 'banhos',
    preco: 10.00,
    imagem: '/produtos/banho-protecao.jpg',
    descricao: 'Uma mistura tradicional de ervas aromáticas para lavar as preocupações do dia a dia e proporcionar um alívio profundo.',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Arruda, Sálvia e Eucalipto']
  },

  // ==========================================
  // --- CATEGORIA: SAL RITUALÍSTICO (SAIS AROMÁTICOS) ---
  // ==========================================
  {
    id: 601,
    nome: 'Sal Aromático: Prosperidade e Energia',
    categoria: 'sal-ritualistico',
    preco: 10.00,
    imagem: '/produtos/sal-prosperidade.png',
    descricao: 'Sais marinhos esfoliantes e perfumados, com tonalidade amarela e toque de ervas finas. Ideal para banhos de imersão ou esfoliação suave dos pés.',
    detalhes: ['Peso: 100g', 'Cor: Amarelo suave', 'Ervas: Louro, Canela e Alecrim']
  },
  {
    id: 602,
    nome: 'Sal Aromático: Amor e Conexão',
    categoria: 'sal-ritualistico',
    preco: 10.00,
    imagem: '/produtos/sal-amor.jpeg',
    descricao: 'Sais de banho perfumados com hibisco e manjericão, criados para proporcionar uma experiência sensorial relaxante e romântica.',
    detalhes: ['Peso: 100g', 'Cor: Vermelho', 'Ervas: Hibisco, Artemísia e Manjericão']
  },
  {
    id: 603,
    nome: 'Sal Aromático: Renovação e Purificação',
    categoria: 'sal-ritualistico',
    preco: 10.00,
    imagem: '/produtos/sal-protecao.jpg',
    descricao: 'Sais marinhos intensos com foco na neutralização de tensões do corpo e descarrego do estresse do dia a dia.',
    detalhes: ['Peso: 100g', 'Cor: Escuro natural', 'Ervas: Arruda, Sálvia e Eucalipto']
  },

  // ==========================================
  // --- CATEGORIA: KITS ---
  // ==========================================
  {
    id: 701,
    nome: 'Kit de Autocuidado: Amor & Atração',
    categoria: 'kits',
    preco: 60.00,
    imagem: '/produtos/kit-amor.jpeg',
    descricao: 'Um kit completo criado para nutrir sua autoestima e proporcionar momentos inesquecíveis de carinho pessoal. Acompanha uma linda caixa de madeira artesanal.',
    detalhes: ['Banho Botânico: Amor e Autoestima', 'Óleo Botânico: Amor e Nutrição', 'Sal Aromático: Amor e Conexão', 'Blend Natural: Chá de Amor e Autoestima', 'Amuleto Botânico: Amor e Harmonia']
  },
  {
    id: 702,
    nome: 'Kit de Autocuidado: Limpeza e Serenidade',
    categoria: 'kits',
    preco: 60.00,
    imagem: '/produtos/kit-protecao.jpg',
    descricao: 'Um kit desenhado para proporcionar alívio, tranquilidade e proteção contra a rotina exaustiva. Acompanha caixa de madeira sustentável.',
    detalhes: ['Banho Botânico: Limpeza e Frescor', 'Óleo Botânico: Equilíbrio e Proteção', 'Sal Aromático: Renovação e Purificação', 'Blend Natural: Chá de Purificação e Renovação', 'Amuleto Botânico: Proteção e Harmonia']
  },
  {
    id: 703,
    nome: 'Kit de Autocuidado: Prosperidade e Foco',
    categoria: 'kits',
    preco: 60.00,
    imagem: '/produtos/kit-prosperidade.png',
    descricao: 'Conjunto especial com ervas e aromas estimulantes para atrair boas ideias, motivação e clareza nos seus objetivos.',
    detalhes: ['Banho Botânico: Prosperidade e Leveza', 'Óleo Botânico: Sucesso e Vitalidade', 'Sal Aromático: Prosperidade e Energia', 'Blend Natural: Chá de Prosperidade e Entusiasmo', 'Amuleto Botânico: Abundância']
  },
  {
    id: 704,
    nome: 'Kit Ervanaria: 10 Ervas Selecionadas',
    categoria: 'kits',
    preco: 30.00,
    imagem: '/produtos/kit-ervas.jpg',
    descricao: 'Uma coleção artesanal com 10 ervas naturais puras para você criar suas próprias infusões, banhos e defumações. Acompanha caixinha de madeira.',
    detalhes: ['Contém: 10 Ervas selecionadas', 'Caixa de Madeira Artesanal', 'Peso: 5g cada porção']
  },

  // ==========================================
  // --- CATEGORIA: AMULETOS (ANTIGOS PATUÁS) ---
  // ==========================================
  {
    id: 801,
    nome: 'Amuleto Botânico: Amor e Harmonia',
    categoria: 'patuas',
    preco: 15.00,
    imagem: '/produtos/patua-amor.jpeg',
    descricao: 'Pequeno saquinho artesanal com ervas naturais perfumadas para carregar na bolsa ou manter na mesa de trabalho, emanando boas vibrações de amor.',
    detalhes: ['Contém ervas naturais selecionadas', 'Artemísia, Hibisco e Manjericão', 'Perfeito para levar com você ou presentear']
  },
  {
    id: 802,
    nome: 'Amuleto Botânico: Proteção e Equilíbrio',
    categoria: 'patuas',
    preco: 15.00,
    imagem: '/produtos/patua-protecao.jpg',
    descricao: 'Amuleto de ervas secas que exalam aromas herbais revigorantes, criado para ancorar energias de paz e proteção ao seu redor.',
    detalhes: ['Seleção de ervas purificadoras', 'Arruda, Sálvia e Eucalipto', 'Ideal para usar na bolsa, carro ou gaveta']
  },
  {
    id: 803,
    nome: 'Amuleto Botânico: Prosperidade e Foco',
    categoria: 'patuas',
    preco: 15.00,
    imagem: '/produtos/patua-prosperidade.png',
    descricao: 'Sachê aromático com ervas estimulantes e especiarias para inspirar progresso, criatividade e boas oportunidades.',
    detalhes: ['Com especiarias naturais', 'Louro, Alecrim e Canela', 'Ideal para manter na carteira ou local de trabalho']
  },

  // ==========================================
  // --- CATEGORIA: GUIAS E JAPAMALAS ---
  // ==========================================
  {
    id: 901,
    nome: 'Colar de Cristais: Energia & Força Feminina',
    categoria: 'guias',
    preco: 100.00,
    imagem: '/produtos/guia-pomba-gira-1.png',
    descricao: 'Acessório artesanal confeccionado com cristais de alta qualidade, pensado para exaltar a elegância, a autoconfiança e a força da energia feminina.',
    detalhes: ['Comprimento: 90 cm', 'Material: Cristal Austríaco', 'Acabamento especial e detalhado']
  }
];
