import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getRates(base: string) {
    return this.http.get(
      `http://data.fixer.io/api/latest?access_key=5de68d7904f8f501bb47d85c9dec718e&format=1&&symbols=CAD,USD,EUR`
    );
  }
}
