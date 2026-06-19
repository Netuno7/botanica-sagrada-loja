import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// TOKEN DO PAGBANK SANDBOX
const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN;

console.log('Servidor iniciado');
console.log('Token carregado:', PAGBANK_TOKEN ? 'SIM' : 'NÃO');

app.post('/api/criar-pix', async (req, res) => {
  console.log('-> Recebi uma nova requisição de pagamento via PIX!');

  const {
    valor,
    emailCliente,
    nomeCliente,
    cpfCliente
  } = req.body;

  if (!valor || !emailCliente || !nomeCliente || !cpfCliente) {
    return res.status(400).json({
      success: false,
      message: 'Dados incompletos.'
    });
  }

  try {
    const valorEmCentavos = Math.round(Number(valor) * 100);

    const payload = {
      reference_id: `PED-BOTANICA-${Date.now()}`,
      customer: {
        name: nomeCliente,
        email: emailCliente,
        tax_id: cpfCliente.replace(/\D/g, '')
      },
      qr_codes: [
        {
          amount: {
            value: valorEmCentavos
          },
          expiration_date: new Date(
            Date.now() + 15 * 60 * 1000
          ).toISOString()
        }
      ]
    };

    console.log('Enviando pedido para o PagBank...');

    const respostaPagBank = await axios.post(
      'https://api.pagseguro.com/orders',
      payload,
      {
        headers: {
          Authorization: `Bearer ${PAGBANK_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ PIX gerado com sucesso');

    const qrCodeDados = respostaPagBank.data.qr_codes?.[0];

    return res.json({
      success: true,
      qrCodeImagem:
        qrCodeDados?.links?.find(
          (item) => item.rel === 'QRCODE.PNG'
        )?.href || null,
      qrCodeCopiaECola: qrCodeDados?.text || ''
    });

  } catch (error) {
    console.error(
      '❌ ERRO PAGBANK:',
      JSON.stringify(error.response?.data, null, 2)
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.error_messages?.[0]?.description ||
        error.message ||
        'Erro ao gerar PIX'
    });
  }
});

const PORTA = 3001;

app.listen(PORTA, () => {
  console.log(`✨ Servidor rodando na porta ${PORTA}`);
});