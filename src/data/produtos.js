// src/data/produtos.js

export const CONFIG = {
  TELEFONE_WHATSAPP: "554797002521",
  NOME_LOJA: "BOTÂNICA SAGRADA",
  SLOGAN: "ALQUIMIA, RITUAL E TRADIÇÃO ERVANÁRIA",
  MOEDA: "R$"
};

export const CATEGORIAS = [
  { id: 'todos', nome: 'Ver Tudo', icone: '✨', slogan: 'Explore todos os produtos da nossa loja.' },
  { id: 'velas', nome: 'Velas', icone: '🕯️', slogan: 'Velas criadas com intenção energética.' },
  { id: 'chas', nome: 'Chás', icone: '🫖', slogan: 'Blends de conexão interna e cura sutil' },
  { id: 'oleos', nome: 'Óleos', icone: '🧪', slogan: 'Extratos lipossolúveis para ritos de passagem e proteção' },
  { id: 'patuas', nome: 'Patuás', icone: '🧿', slogan: 'Escudos energéticos de ancoramento e blindagem' },
  { id: 'banhos', nome: 'Banhos', icone: '🌿', slogan: 'Limpeza áurica profunda e reposição energética' },
  { id: 'sal-ritualistico', nome: 'Sal Ritualístico', icone: '🧂', slogan: 'Purificação e equilíbrio energético' },
  { id: 'kits', nome: 'Kits Ritualísticos', icone: '🎁', slogan: 'Conjuntos completos para rituais e práticas espirituais' },
  { id: 'guias', nome: 'Guias E Japamalas', icone: '📿', slogan: 'Recursos para aprofundar sua prática espiritual' }
];

export const PRODUTOS_MASTER = [
  // ==========================================
  // --- CATEGORIA: VELAS ---
  // ==========================================
  {
    id: 101,
    nome: 'Vela de Amor: Magnetismo e Fogo Interno',
    categoria: 'velas',
    preco: 15.00,
    imagem: '/produtos/vela-amor.png',
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, formato perfeito bem detalhado, esta vela é consagrada para despertar o amor-próprio e o magnetismo pessoal.',
    detalhes: ['Tempo de queima estimado: 3h', 'Cor: Vermelho Amor intenso', 'Peso: 40g']
  },
  {
    id: 102,
    nome: 'Vela Botânica: Lavanda Rosa',
    categoria: 'velas',
    preco: 30.00,
    imagem: '/produtos/vela-lavanda-rosa.png',
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, recipiente de vidro com visual elegante, esta vela é consagrada para atrair o amor suave e promover a harmonia emocional.',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Rosa Suave', 'Peso: 120g', 'Essência: Lavanda']
  },
  {
    id: 103,
    nome: 'Vela Botânica: Lavanda Pura',
    categoria: 'velas',
    preco: 30.00,
    imagem: '/produtos/vela-lavanda.png',
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, recipiente de vidro com visual elegante, esta vela traz a paz e tranquilidade para o seu ambiente.',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Branco', 'Peso: 120g', 'Essência: Lavanda']
  },
  {
    id: 104,
    nome: 'Vela Botânica: Canela Prosperidade',
    categoria: 'velas',
    preco: 30.00,
    imagem: '/produtos/vela-canela.png',
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, recipiente de vidro com visual elegante, esta vela movimenta o fluxo financeiro e promove a prosperidade para o seu ambiente.',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Laranja', 'Peso: 120g', 'Essência: Canela']
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
    descricao: 'Uma infusão de ervas naturais desenvolvida para despertar a sua autoestima e confiança.',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Hibisco, Artemísia, Manjericão', 'Rende aproximadamente 3 xícaras']
  },
  {
    id: 202,
    nome: 'Blend Natural: Chá de Frutificação e Bonança',
    categoria: 'chas',
    preco: 10.00,
    imagem: '/produtos/cha-prosperidade.png',
    descricao: 'Uma infusão de ervas naturais criada para elevar o seu padrão vibratório e sintonizar sua mente com o fluxo da abundância e prosperidade.',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Canela, Alecrim, Louro', 'Rende aproximadamente 3 xícaras']
  },
  {
    id: 203,
    nome: 'Blend Natural: Chá de Purificação e Fortalecimento',
    categoria: 'chas',
    preco: 10.00,
    imagem: '/produtos/cha-protecao.jpg',
    descricao: 'Uma poderosa infusão de ervas naturais criada para purificar o espírito de dentro para fora e blindar o seu campo magnético contra energias densas.',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Arruda, Sálvia, Eucalipto', 'Rende aproximadamente 3 xícaras']
  },

  // ==========================================
  // --- CATEGORIA: ÓLEOS ---
  // ==========================================
  {
    id: 301,
    nome: 'Óleo Botânico: Sucesso e Riqueza',
    categoria: 'oleos',
    preco: 15.00,
    imagem: '/produtos/oleo-prosperidade.png',
    descricao: 'Uma poderosa poção de alta frequência vibracional, formulada em uma base pura de Óleo Natural de Girassol — a planta que carrega a própria energia do Sol.',
    detalhes: ['Peso: 20ml', '100% Natural', 'Ervas: Canela, Laranja, Maçã e Alecrim', 'Livre de conservantes ou essências artificiais']
  },
  {
    id: 302,
    nome: 'Óleo Botânico: Amor e Atração',
    categoria: 'oleos',
    preco: 15.00,
    imagem: '/produtos/oleo-amor.jpeg',
    descricao: 'Uma poção corporal luxuosa, formulada com uma base pura de Óleo de Amêndoas Doces e infundida com ervas de alta potência magnética. O Hibisco atua despertando o fogo interno.',
    detalhes: ['Base 100% natural de Amêndoas Doces', 'Infundido com ervas verdadeiras por ciclos lunares', 'Ideal para usar pós-banho ou em massagens']
  },
  {
    id: 303,
    nome: 'Óleo Botânico: Defesa e Blindagem',
    categoria: 'oleos',
    preco: 15.00,
    imagem: '/produtos/oleo-protecao.jpg',
    descricao: 'Um poderoso óleo ritualístico de alta proteção, formulado em uma base leve e regeneradora de Óleo de Semente de Uva. Este elixir atua como um verdadeiro escudo invisível.',
    detalhes: ['Base 100% natural de Semente de Uva', 'Macerado com Arruda, Sálvia e Eucalipto legítimos', 'Ideal para aplicar nos pulsos, nuca e chakras antes de sair de casa']
  },

  // ==========================================
  // --- CATEGORIA: BANHOS ---
  // ==========================================
  {
    id: 403,
    nome: 'Banho Botânico: Amor e Magnetismo',
    categoria: 'banhos',
    preco: 10.00,
    imagem: '/produtos/banho-amor.jpeg',
    descricao: 'Uma mistura poderosa desenvolvida para despertar o amor-próprio e o poder da atração.',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Hibisco, Artemísia e Manjericão']
  },
  {
    id: 404,
    nome: 'Banho Botânico: Prosperidade e Florescimento',
    categoria: 'banhos',
    preco: 10.00,
    imagem: '/produtos/banho-prosperidade.png',
    descricao: 'Uma mistura poderosa desenvolvida para movimentar o fluxo da abundância e sintonizar sua vida com o sucesso material.',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Alecrim, Canela e Louro']
  },
  {
    id: 405,
    nome: 'Banho Botânico: Proteção e Renovação',
    categoria: 'banhos',
    preco: 10.00,
    imagem: '/produtos/banho-protecao.jpg',
    descricao: 'Uma mistura poderosa desenvolvida para purificar, descarregar e blindar o seu campo magnético.',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Arruda, Sálvia e Eucalipto']
  },

  // ==========================================
  // --- CATEGORIA: SAL RITUALÍSTICO ---
  // ==========================================
  {
    id: 601,
    nome: 'Sal Ritualístico: Fertilidade e Fortuna',
    categoria: 'sal-ritualistico',
    preco: 10.00,
    imagem: '/produtos/sal-prosperidade.png',
    descricao: 'Uma alquimia potente e vibrante desenvolvida para movimentar a energia financeira e atrair o sucesso material. Este sal marinho purificador é imantado na cor amarela com ervas.',
    detalhes: ['Peso: 100g', 'Cor: Amarelo', 'Ervas: Louro, Canela e Alecrim']
  },
  {
    id: 602,
    nome: 'Sal Ritualístico: Amor e Sedução',
    categoria: 'sal-ritualistico',
    preco: 10.00,
    imagem: '/produtos/sal-amor.jpeg',
    descricao: 'Uma alquimia intensa e envolvente criada para despertar o amor-próprio, o brilho pessoal e o poder de sedução. Este sal marinho purificador é imantado na cor vermelha com ervas.',
    detalhes: ['Peso: 100g', 'Cor: Vermelho', 'Ervas: Hibisco, Artemísia e Manjericão']
  },
  {
    id: 603,
    nome: 'Sal Ritualístico: Limpeza e Banimento',
    categoria: 'sal-ritualistico',
    preco: 10.00,
    imagem: '/produtos/sal-protecao.jpg',
    descricao: 'Uma alquimia de corte pesado desenvolvida para purificar, descarregar e blindar o seu campo magnético. Este sal marinho purificador é imantado na cor negra com ervas.',
    detalhes: ['Peso: 100g', 'Cor: Negro', 'Ervas: Arruda, Sálvia e Eucalipto']
  },

  // ==========================================
  // --- CATEGORIA: KITS ---
  // ==========================================
  {
    id: 701,
    nome: 'Kit Ritual Completo: Magnetismo e Amor Absoluto',
    categoria: 'kits',
    preco: 60.00,
    imagem: '/produtos/kit-amor.jpeg',
    descricao: 'Um kit completo para despertar o seu poder de atração, autoestima e brilho pessoal. Contém 5 itens selecionados dispostos em uma linda caixa de madeira reutilizável.',
    detalhes: ['Banho Botânico: Amor e Magnetismo', 'Óleo Botânico: Amor e Atração', 'Sal Ritualístico: Amor e Sedução', 'Blend Natural: Chá de Amor e Autoestima', 'Patuá do Amor: Magnetismo e Desejo']
  },
  {
    id: 702,
    nome: 'Kit Ritual Completo: Limpeza e Proteção',
    categoria: 'kits',
    preco: 60.00,
    imagem: '/produtos/kit-protecao.jpg',
    descricao: 'Um kit completo para proteger você e seu ambiente de energias densas. Contém 5 itens essenciais acompanhados de uma caixa de madeira reutilizável.',
    detalhes: ['Banho Botânico: Proteção e Renovação', 'Óleo Botânico: Defesa e Blindagem', 'Sal Ritualístico: Limpeza e Banimento', 'Blend Natural: Chá de Purificação e Fortalecimento', 'Patuá da Proteção: Barreira e Escudo']
  },
  {
    id: 703,
    nome: 'Kit Ritual Completo: Prosperidade e Abundância',
    categoria: 'kits',
    preco: 60.00,
    imagem: '/produtos/kit-prosperidade.png',
    descricao: 'Um kit completo meticulosamente preparado para atrair abundância, sucesso e movimentação material. Acompanha caixa de madeira de estúdio.',
    detalhes: ['Banho Botânico: Prosperidade e Florescimento', 'Óleo Botânico: Sucesso e Riqueza', 'Sal Ritualístico: Fertilidade e Fortuna', 'Blend Natural: Chá de Frutificação e Bonança', 'Patuá de Prosperidade: Conquista e Triunfo']
  },

   {
    id: 704,
    nome: 'Kit 10 Ervas Naturais: Limpeza, Proteção e Purificação',
    categoria: 'kits',
    preco: 30.00,
    imagem: '/produtos/kit-10-ervas.jpg',
    descricao: 'Um kit com 10 ervas naturais selecionadas para limpeza, proteção e purificação do ambiente. Acompanha caixa de madeira de estúdio. Hibisco, Artemísia, Manjericão, Arruda, Sálvia, Eucalipto, Alecrim, Canela em po e em pau, e Louro.',
    detalhes: ['Contem: 10 Ervas', 'Caixa De Madeira', 'Peso: 5g Cada Erva']
  },

  // ==========================================
  // --- CATEGORIA: PATUÁS ---
  // ==========================================
  {
    id: 801,
    nome: 'Patuá do Amor: Magnetismo e Amor Absoluto',
    categoria: 'patuas',
    preco: 15.00,
    imagem: '/produtos/patua-amor.jpeg',
    descricao: 'Um patuá especializado para despertar o seu poder de atração, autoestima e brilho pessoal.',
    detalhes: ['Contém ervas selecionadas', 'Artemísia, Hibisco e Manjericão verdadeiros', 'Perfeito para carregar na bolsa ou deixar no ambiente de trabalho']
  },
  {
    id: 802,
    nome: 'Patuá da Proteção: Barreira e Escudo',
    categoria: 'patuas',
    preco: 15.00,
    imagem: '/produtos/patua-protecao.jpg',
    descricao: 'Um patuá especializado para proteger seu campo áurico e o seu ambiente contra energias nocivas.',
    detalhes: ['Contém ervas escolhidas para fortalecer o campo energético', 'Arruda, Sálvia e Eucalipto verdadeiros', 'Perfeito para carregar na bolsa ou deixar no ambiente de trabalho']
  },
  {
    id: 803,
    nome: 'Patuá de Prosperidade: Conquista e Triunfo',
    categoria: 'patuas',
    preco: 15.00,
    imagem: '/produtos/patua-prosperidade.png',
    descricao: 'Um patuá especializado e imantado para atrair caminhos abertos, abundância e sucesso financeiro.',
    detalhes: ['Contém ervas escolhidas para atrair fartura', 'Louro, Alecrim e Canela legítimos', 'Perfeito para carregar na bolsa ou deixar no ambiente de trabalho']
  },

  // ==========================================
  // --- CATEGORIA: GUIAS E JAPAMALAS ---
  // ==========================================
  {
    id: 901,
    nome: 'Guia Pomba Gira: Conexão e Magia Feminina',
    categoria: 'guias',
    preco: 100.00,
    imagem: '/produtos/guia-pomba-gira-1.png',
    descricao: 'Um guia especializado para fortalecer a conexão com a energia feminina e desbloquear o poder da magia.',
    detalhes: ['Comprimento: 90 cm', 'Material: Cristal Austríaco', 'Pingente Numero 7 + Garfo + Firma']
  }
];
