const exchangeRate = 330;

async function convert(fromCurrency, toCurrency, amount) {
    let exchangeResult;
    
    if (fromCurrency === 'EUR' && toCurrency === 'HUF') {
        exchangeResult = amount * exchangeRate;
    }
    
    if (fromCurrency === 'HUF' && toCurrency === 'EUR') {
        exchangeResult = amount * (1 / exchangeRate);
    }

    return JSON.stringify(exchangeResult);
}

module.exports = { convert }
