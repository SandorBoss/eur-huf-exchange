const { get } = require('https');
const storage = require('./storage');
const convert = require
const http = require('http');

const port = 8080;
const host = 'localhost';
const currencyRequestUrl = '/symbols';
const convertRequestUrl = '/convert';
const headContentType = {
    "ContentType" : "application/json"
};

const server = http.createServer(async (request, response) => {
    let httpStatus = 404;
    let dataToSend = 'Page not found!';
    
    if (request.url === currencyRequestUrl) {
        httpStatus = 200;
        dataToSend = await storage.getCurrencies();
    }

    if (request.url === convertRequestUrl) {
        if (request.query.fromCurrency === request.query.toCurrency) {
            httpStatus = 400;
            dataToSend = 'Bad request!';
        } else {
            const convertData = await getConvertDataFromUrlQuery(request.query);
            httpStatus = 200;
            dataToSend = convert.convert(
                convertData.fromCurrency,
                convertData.toCurrency,
                convertData.amount
            );
        }
    }

    sendResponse(httpStatus, dataToSend, response);
}).listen(port, host);

async function getConvertDataFromUrlQuery(urlQuery) {
    const convertData = {
        fromCurrency: await urlQuery.from,
        toCurrency: await urlQuery.to,
        amount: await urlQuery.amount
    }

    return convertData;
}

async function sendResponse(httpStatus, dataToSend, response) {
    response.writeHead(httpStatus, headContentType);
    response.write(await dataToSend, 'utf8');
    response.end();
}
