const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do Mercado Pago com sua chave segura
// (Usaremos uma chave de teste temporária até você colocar a sua oficial)
const client = new MercadoPagoConfig({ 
  accessToken: 'TEST-5716174627254593-021814-7bc33be29dc6d628d407ffebfa447cb6-174315222' 
});

const payment = new Payment(client);

// ROTA QUE O SEU SITE VAI CHAMAR PARA GERAR O PIX
app.post('/api/criar-pix', async (req, res) => {
  const { valor, emailCliente, nomeCliente } = req.body;

  const body = {
    transaction_amount: Number(valor),
    description: 'Pedido - Botânica Sagrada',
    payment_method_id: 'pix',
    payer: {
      email: emailCliente || 'cliente@email.com',
      first_name: nomeCliente || 'Cliente',
      last_name: 'Sagrado',
      identification: {
        type: 'CPF',
        number: '19100000000' // CPF de teste padrão exigido
      }
    }
  };

  try {
    const resposta = await payment.create({ body });
    
    // Devolve o QR Code em formato de imagem e o código "Copia e Cola" para o React exibir
    res.json({
      qrCodeCopiaECola: resposta.point_of_interaction.transaction_data.qr_code,
      qrCodeImagem: resposta.point_of_interaction.transaction_data.qr_code_base64
    });
  } catch (error) {
    console.error('Erro ao gerar Pix no Mercado Pago:', error);
    res.status(500).json({ error: 'Erro ao processar o pagamento por Pix.' });
  }
});

// O Servidor vai rodar na porta 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✨ O Cérebro da loja está ligado na porta ${PORT}!`);
});