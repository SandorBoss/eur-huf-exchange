export interface Currency {
    id: number,
    currency: string,
};

export interface ExchnageQueryParams {
    fromCurrency: string,
    toCurrency: string,
    amount: string,
} 

export interface ExchangeResult {
    resultValue: string,
}
