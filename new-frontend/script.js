function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, fromCurrency, toCurrency })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').value = data.convertedAmount;
    })
    .catch(() => {
      document.getElementById('result').value = 'Erro';
    });
  }