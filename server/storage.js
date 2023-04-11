const { Client } = require('pg');
const pgEnvironment = require('dotenv');
pgEnvironment.config();

const currencyQueryString = 'SELECT * FROM public.currency';

async function runQuery(queryString) { 
    try {
        const pgClient = new Client({
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE
        });

        await pgClient.connect();
        const queryResult = await pgClient.query(queryString);
        const resultJson = parseResultToJson(queryResult.rows);
        pgClient.end();
        return resultJson;
    } catch (error) {
        console.log(error);
    }
}

async function getCurrencies() {
    let currencies = await runQuery(currencyQueryString);
    console.log(currencies);
    return currencies;
}

function parseResultToJson(rows) {
    return JSON.stringify(rows);
}

getCurrencies();
