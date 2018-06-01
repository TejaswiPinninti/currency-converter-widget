import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getRates(base: string) {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`);
  }
}
