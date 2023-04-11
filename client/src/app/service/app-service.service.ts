import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Currency, ExchangeResult, ExchnageQueryParams } from '../types/custom-types';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  currencyUrl: string = '/symbols';
  getExchangeUrl: string = '/convert';

  constructor(private http: HttpClient) { }

  getAvailableCurrencies() {
    return this.http.get<Currency>(this.currencyUrl);
  }

  getExchangeResult(fromCurrency: string, toCurrency: string, amount: string) {
    let params = new HttpParams;
    params
      .set('fromCurrency', fromCurrency)
      .set('toCurrency', toCurrency)
      .set('amount', amount);
    
      return this.http.get<ExchangeResult>(
      this.getExchangeUrl,
      { params }
    );
  }
}
