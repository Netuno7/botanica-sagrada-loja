// src/data/produtos.js

export const CONFIG = {
  TELEFONE_WHATSAPP: "554797002521", // <-- Coloque seu WhatsApp comercial aqui
  NOME_LOJA: "BOTÂNICA SAGRADA",
  SLOGAN: "ALQUIMIA, RITUAL E TRADIÇÃO ERVANÁRIA",
  MOEDA: "R$"
};

export const CATEGORIAS = [
  { id: 'todos', nome: 'Ver Tudo', icone: '✨', slogan: 'Todos os artefatos consagrados do nosso altar' },
  { id: 'velas', nome: 'Velas Ritualísticas', icone: '🕯️', slogan: 'Velas criadas com intenção energética, unindo elementos botânicos e vibrações espirituais para rituais de amor, prosperidade, proteção e equilíbrio interior. Cada vela é um instrumento de transformação energética e conexão espiritual.' },
  { id: 'chas', nome: 'Chás Ritualísticos', icone: '🫖', slogan: 'Blends de conexão interna e cura sutil' },
  { id: 'oleos', nome: 'Óleos Ritualísticos', icone: '🧪', slogan: 'Extratos lipossolúveis para ritos de passagem e proteção' },
  { id: 'patuas', nome: 'Patuás Ritualísticos', icone: '🧿', slogan: 'Escudos energéticos de ancoramento e blindagem' },
  { id: 'banhos', nome: 'Banhos Ritualísticos', icone: '🌿', slogan: 'Limpeza áurica profunda e reposição energética' },
  { id: 'sal-ritualistico', nome: 'Sal Ritualístico', icone: '🧂', slogan: 'Purificação e equilíbrio energético' },
  { id: 'kits', nome: 'Kits Ritualísticos', icone: '🎁', slogan: 'Conjuntos completos para rituais e práticas espirituais' }
];

export const PRODUTOS_MASTER = [
  // --- CATEGORIA: VELAS ---
  
   {
    id: 101, // Próximo ID livre na categoria de velas
    nome: 'Vela de Amor: Magnetismo e Fogo Interno', // Exemplo com a Opção 1
    categoria: 'velas',
    preco: 14.99, // Ajuste para o seu preço real de venda
    imagem: '/produtos/vela-amor.png', // Nome exato do arquivo de imagem na sua pasta produtos
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, formato perfeito bem detalhado, esta vela é consagrada para despertar o amor-próprio, e magnetismo pessoal...',
    detalhes: ['Tempo de queima estimado: 3h', 'Cor: Vermelho Amor intenso', 'Peso: 40g']
  
  },
  {
    id: 102, // Próximo ID livre na categoria de velas
    nome: 'Vela Botânica: Lavanda Rosa', // Exemplo com a Opção 1
    categoria: 'velas',
    preco: 29.99, // Ajuste para o seu preço de venda real
    imagem: '/produtos/vela-lavanda-rosa.png', // Nome exato da foto na sua pasta
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, recipiente de vidro com visual elegante, esta vela é consagrada para atrair o amor suave e promover a harmonia emocional...',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Rosa Suave', 'Peso: 120g', 'Essência: Lavanda']
  },
  
    {
    id: 103, // Próximo ID livre na categoria de velas
    nome: 'Vela Botânica: Lavanda Pura', // Exemplo com a Opção 1
    categoria: 'velas',
    preco: 29.99, // Ajuste para o seu preço de venda real
    imagem: '/produtos/vela-lavanda.png', // Nome exato do arquivo na sua pasta produtos
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, recipiente de vidro com visual elegante, esta vela traz a paz e tranquilidade para o seu ambiente...',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Branco', 'Peso: 120g', 'Essência: Lavanda']
  },
  
   {
    id: 104, // Próximo ID livre na categoria de velas
    nome: 'Vela Botânica: Canela Prosperidade', // Exemplo com a Opção 1
    categoria: 'velas',
    preco: 29.99, // Ajuste para o seu preço de venda real
    imagem: '/produtos/vela-canela.png', // Nome exato do arquivo na sua pasta produtos
    descricao: 'Feita artesanalmente com parafina mineral e pavio de algodão puro, pigmentada com corantes naturais, recipiente de vidro com visual elegante, esta vela movimenta o fluxo financeiro e promove a prosperidade para o seu ambiente...',
    detalhes: ['Tempo de queima estimado: 6h', 'Cor: Laranja', 'Peso: 120g', 'Essência: Canela']
  },

  // --- CATEGORIA: CHÁS ---
  {
    
    id: 201, // Próximo ID livre na categoria de chás
    nome: 'Blend de Ervas Naturais: Chá de Amor e Autoestima', // Exemplo com a Opção 1
    categoria: 'chas',
    preco: 9.99, // Ajuste para o seu preço real de venda
    imagem: '/produtos/cha-amor.jpeg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Uma infusão de ervas naurais desenvolvida para despertar a sua autoestima e confiança...',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Hibisco, Artemísia, Manjericão', 'Rende aproximadamente 3 xícaras']
  },
  
 {
    id: 202, // Próximo ID livre na categoria de chás
    nome: 'Blend de Ervas Naturais: Chá de Prosperidade e Abundância', // Exemplo com a Opção 1
    categoria: 'chas',
    preco: 9.99, // Ajuste para o seu preço real de venda
    imagem: '/produtos/cha-prosperidade.png', // Nome exato do arquivo de imagem na sua pasta produtos
    descricao: 'Uma infusão de ervas naturais criada para elevar o seu padrão vibratório e sintonizar sua mente com o fluxo da abundância e prosperidade...',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Canela, Alecrim, Louro', 'Rende aproximadamente 3 xícaras']
  },

  {
    id: 203, // Próximo ID livre na categoria de chás
    nome: 'Blend de Ervas Naturais: Chá de Proteção e Defesa', // Exemplo com a Opção 1
    categoria: 'chas',
    preco: 9.99, // Ajuste para o seu preço de venda real
    imagem: '/produtos/cha-protecao.jpg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Uma poderosa infusão de ervas naturais criada para purificar o espírito de dentro para fora e blindar o seu campo magnético contra energias densas...',
    detalhes: ['Peso: 15g', '100% Natural', 'Ervas: Arruda, Sálvia, Eucalipto', 'Rende aproximadamente 3 xícaras']
  },
  

  // --- CATEGORIA: ÓLEOS ---
  
   {
    id: 301, // Próximo ID livre na categoria de óleos
    nome: 'Óleo botânico: Prosperidade e Abundância', // Exemplo com a Opção 1
    categoria: 'oleos',
    preco: 35.00, // Ajuste para o seu preço de venda
    imagem: '/produtos/oleo-prosperidade.png', // Nome exato do arquivo na sua pasta
    descricao: 'Uma poderosa poção de alta frequência vibracional, formulada em uma base pura de Óleo Natural de Girassol — a planta que carrega a própria energia do Sol...',
    detalhes: ['Peso: 20ml', '100% Natural', 'Ervas: Canela, Laranja, Maçã e Alecrim', 'Livre de conservantes ou essências artificiais', 'Perfeito para tomar no início do dia ou de novos projetos']
  },
  
   {
    id: 302, // ID livre na categoria de óleos
    nome: 'Óleo Alquímico Afrodite: Magnetismo e Sedução', // Exemplo com a Opção 1
    categoria: 'oleos',
    preco: 35.00, // Ajuste para o seu preço de venda real
    imagem: '/produtos/oleo-amor.jpeg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Uma poção corporal luxuosa, formulada com uma base pura de Óleo de Amêndoas Doces e infundida com ervas de alta potência magnética. O Hibisco atua despertando o fogo interno...',
    detalhes: ['Base 100% natural de Amêndoas Doces', 'Infundido com ervas verdadeiras por ciclos lunares', 'Ideal para usar pós-banho ou em massagens']
  },

  
   {
    id: 303, // Próximo ID livre na categoria de óleos
    nome: 'Óleo Alquímico Escudo Purificador: Proteção e Blindagem', // Exemplo com a Opção 1
    categoria: 'oleos',
    preco: 35.00, // Ajuste para o seu preço de venda real
    imagem: '/produtos/oleo-protecao.jpg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Um poderoso óleo ritualístico de alta proteção, formulado em uma base leve e regeneradora de Óleo de Semente de Uva. Este elixir atua como um verdadeiro escudo invisível...',
    detalhes: ['Base 100% natural de Semente de Uva', 'Macerado com Arruda, Sálvia e Eucalipto legítimos', 'Ideal para aplicar nos pulsos, nuca e chakras antes de sair de casa']
  },

  // --- CATEGORIA: BANHOS ---
  {
    id: 403,
    nome: 'Banho Ervas Naturais: Amor e Magnetismo',
    categoria: 'banhos',
    preco: 14.99,
    imagem: '/produtos/banho-amor.jpeg',
    descricao: 'Uma mistura poderosa desenvolvida para despertar o amor-próprio e o poder de atração. A intensidade do Hibisco atua como um imã magnético para a paixão, enquanto a Artemísia sintoniza a intuição e a energia lunar. Finalizado com o Manjericão, este banho harmoniza a aura, abrindo os caminhos do coração...',
    detalhes: ['Peso: 30g', '100% Natural', 'Ervas: Hibisco, Artemísia e Manjericão']
  },
  {
    id: 404,
    nome: 'Banho Sagrado Alquimia da Prosperidade',
    categoria: 'banhos',
    preco: 14.99,
    imagem: '/produtos/banho-prosperidade.png',
    descricao: 'Desperte o fluxo de abundância que já existe no universo direto para a sua vida. A sinergia fitoenergética entre o Alecrim, a Canela e o Louro atua limpando as memórias de escassez da aura e ancorando uma vibração de merecimento, brilho pessoal e fartura. Sinta o aroma do sucesso envolver o seu corpo e prepare-se para colher os frutos da sua colheita.',
    detalhes: ['Ervas selecionadas e consagradas', '30g Que rende até 2 banhos intensos', 'Frequência de abertura e atração material']
  },
  {
    id: 405, // Próximo ID livre da sua lista de banhos
    nome: 'Banho Escudo Astral para Proteção e Blindagem', // Exemplo com a Opção 1
    categoria: 'banhos',
    preco: 14.99, // Ajuste para o seu preço de venda
    imagem: '/produtos/banho-protecao.jpg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Uma poderosa alquimia de corte e banimento desenvolvida para purificar a alma e blindar o seu campo magnético contra energias densas...',
    detalhes: ['Contém Arruda, Sálvia e Eucalipto', '30g Que rende até 2 banhos intensos', 'Ideal para descarrego e proteção diária']
  },

  // --- CATEGORIA: SAL RITUALISTICO ---
  {
    id: 601, // Próximo ID livre na sua lista
    nome: 'Sal Alquímico Ouro Solar: Prosperidade e Vitória', // Exemplo com a Opção 1
    categoria: 'sal-ritualistico',
    preco: 9.99, // Preço definido por você
    imagem: '/produtos/sal-prosperidade.png', // Nome exato do arquivo na sua pasta
    descricao: 'Uma alquimia potente e vibrante desenvolvida para movimentar a energia financeira e atrair o sucesso material. Este sal marinho purificador é imantado na cor amarela...',
    detalhes: ['Contém Louro, Canela e Alecrim verdadeiros', 'Potencializado na cor da riqueza e do Sol', 'Rende até 2 rituais de magnetismo']
  },

  {
    id: 602, // Próximo ID livre na categoria de sais
    nome: 'Sal Alquímico Fogo de Vênus: Amor e Magnetismo', // Exemplo com a Opção 1
    categoria: 'sal-ritualistico',
    preco: 9.99, // Mantendo o preço acessível da linha de sais
    imagem: '/produtos/sal-amor.jpeg', // Nome exato do arquivo na sua pasta
    descricao: 'Uma alquimia intensa e envolvente criada para despertar o amor-próprio, o brilho pessoal e o poder de sedução. Este sal marinho purificador é imantado na cor vermelha...',
    detalhes: ['Contém Hibisco, Artemísia e Manjericão verdadeiros', 'Potencializado na cor do fogo e da paixão', 'Rende até 2 rituais de autoestima e poder pessoal']
  },

  {
    id: 603, // Próximo ID livre na categoria de sais
    nome: 'Sal Alquímico Escudo Negro: Proteção e Banimento', // Exemplo com a Opção 1
    categoria: 'sal-ritualistico',
    preco: 9.99, // Preço acessível e padronizado da linha
    imagem: '/produtos/sal-protecao.jpg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Uma alquimia de corte pesado desenvolvida para purificar, descarregar e blindar o seu campo magnético. Este sal marinho purificador é imantado na cor negra...',
    detalhes: ['Contém Arruda, Sálvia e Eucalipto verdadeiros', 'Potencializado na cor do banimento e da blindagem', 'Perfeito para escalda-pés de descarrego ou proteção do lar']
  },

    // --- KITS ---]
    {
    id: 701, // ID livre na nova categoria de kits
    nome: 'Kit Alquímico Ritual de Vênus: Magnetismo e Amor Absoluto', // Exemplo com a Opção 1
    categoria: 'kits',
    preco: 110.00, // Sugestão de valor (somando os itens + caixa de madeira + valor do patuá)
    imagem: '/produtos/kit-amor.jpeg', // Nome exato do arquivo de imagem na sua pasta produtos
    descricao: 'A derradeira experiência de alta magia botânica para despertar o seu poder de atração, autoestima e brilho pessoal. Este kit luxuoso reúne uma linha completa...',
    detalhes: ['Inclui: 1 Banho, 1 Sal Vermelho, 1 Óleo Corporal, 1 Chá, 1 Patuá do Amor e 1 Caixa de Madeira', 'Apanhado de ervas verdadeiras consagradas na energia de Vênus', 'Edição exclusiva e limitada']
  },

  {
    id: 702, // Próximo ID livre na categoria de kits
    nome: 'Kit Alquímico Escudo Astral: Proteção e Blindagem Absoluta', // Exemplo com a Opção 1
    categoria: 'kits',
    preco: 110.00, // Mantendo o padrão de valor da linha de luxo
    imagem: '/produtos/kit-protecao.jpg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'A mais poderosa fortaleza de alta magia botânica desenvolvida para purificar o seu espírito, limpar as cargas densas e blindar o seu campo magnético...',
    detalhes: ['Inclui: 1 Banho, 1 Sal Negro, 1 Óleo Corporal, 1 Chá Protetor, 1 Patuá de Defesa e 1 Caixa de Madeira', 'Potencializado na força do corte e do fechamento de corpo', 'Edição artesanal e limitada']
  },

  {
    id: 703, // Próximo ID livre na categoria de kits
    nome: 'Kit Alquímico Ouro Solar: Prosperidade e Triunfo', // Exemplo com a Opção 1
    categoria: 'kits',
    preco: 110.00, // Preço padronizado para as três caixas de madeira
    imagem: '/produtos/kit-prosperidade.png', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'A mais refinada experiência de alta magia botânica criada para movimentar o fluxo da abundância e sintonizar sua vida com o sucesso material. Este kit luxuoso...',
    detalhes: ['Inclui: 1 Banho, 1 Sal Amarelo, 1 Óleo Corporal, 1 Chá, 1 Patuá do Ouro e 1 Caixa de Madeira', 'Infundido com a fitoenergia solar de atração de riquezas', 'Edição artesanal e limitada']
  },

  // --- PATUAS ---]

   {
    id: 801, // Próximo ID livre na categoria de patuás
    nome: 'Patuá do Amor: Magnetismo e Amor Absoluto', // Exemplo com a Opção 1
    categoria: 'patuas',
    preco: 25.00, // Preço acessível e padronizado da linha
    imagem: '/produtos/patua-amor.jpeg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Um patuá especializado para despertar o seu poder de atração, autoestima e brilho pessoal.',
    detalhes: ['Contém ervas selecionadas', 'Artemisia, Hibisco e Manjericão verdadeiros', 'Perfeito para carregar na bolsa ou deixar no ambiente de trabalho']
  },
    {
    id: 802, // Próximo ID livre na categoria de patuás
    nome: 'Patuá da Proteção: Defesa e Blindagem', // Exemplo com a Opção 1
    categoria: 'patuas',
    preco: 25.00, // Preço acessível e padronizado da linha
    imagem: '/produtos/patua-protecao.jpg', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Um patuá especializado para proteger você e seu ambiente. ',
    detalhes: ['Contém ervas escolhidas para fortalecer o campo energético', 'Arruda, Sálvia e Eucalipto verdadeiros', 'Perfeito para carregar na bolsa ou deixar no ambiente de trabalho']
  },
    {
    id: 803, // Próximo ID livre na categoria de patuás
    nome: 'Patuá de Prosperidade: Prosperidade e Triunfo', // Exemplo com a Opção 1
    categoria: 'patuas',
    preco: 25.00, // Preço acessível e padronizado da linha
    imagem: '/produtos/patua-prosperidade.png', // Nome exato do arquivo na sua pasta de fotos
    descricao: 'Um patuá especializado para atrair abundância e sucesso. ',
    detalhes: ['Contém ervas escolhidas para fortalecer o campo energético', 'Louro, Alecrim e Canela', 'Perfeito para carregar na bolsa ou deixar no ambiente de trabalho']
  },
];