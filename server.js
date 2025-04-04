const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;
const apiKey = '9e26dbf503a64692956747dfabb296ff'; 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'new-frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'new-frontend', 'index.html'));
});
app.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  try {
    const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`);
    const rates = response.data.rates;
    const exchangeRate = rates[toCurrency];
    if (exchangeRate) {
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      res.json({ amount, fromCurrency, toCurrency, convertedAmount });
    } else {
      res.status(400).json({ error: 'Código de moeda inválido' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar taxas de câmbio' });
  }
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});