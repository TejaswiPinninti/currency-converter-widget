import { Component, OnInit, HostListener } from '@angular/core';

import { Options } from '../shared/options.model';
import { Rate } from '../shared/rate.model';
import { CurrencyService } from '../shared/currency.service';
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencyConvertList: Options[];
  currencyBaseList: Options[];
  baseValue: number;
  convertValue: number;
  selectedBase = 'EUR';
  selectedConvert = 'CAD';
  convertRate;
  rateList: Rate[];
  isDisclaimer = false;
  disclaimerMsg;
  regex = new RegExp('^[0-9]*\\.?[0-9]*$', 'g');
  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this.currencyService.getRates(this.selectedBase).subscribe(
      response => {
        const res = <any>response;
        this.currencyBaseList = [{ label: res.base, value: res.base }];
        this.currencyConvertList = [];

        Object.keys(res.rates).forEach(key => {
          if (key !== this.selectedBase) {
            this.currencyConvertList.push({ label: key, value: key });
          }
        });
        this.rateList = res.rates;
        this.convertRate = res.rates[this.selectedConvert];
      },
      error => {
        alert('Something went wrong, Please try again later');
      }
    );
  }

  clearFilter(dd) {
    dd.resetFilter();
  }

  onSelectBase() {
    this.getRates();
    this.clearInputs();
  }

  clearInputs() {
    this.baseValue = null;
    this.convertValue = null;
  }

  onSelectConvert() {
    this.isDisclaimer = false;
    this.convertRate = this.rateList[this.selectedConvert];
    this.clearInputs();
  }

  onKeyUpBase(e) {
    // this.convertValue = this.formatValue(this.convertRate * e);
    this.convertValue = this.convertRate * e;
  }

  onKeyUpConvert(e) {
    // this.baseValue = this.formatValue(e / this.convertRate);
    this.baseValue = e / this.convertRate;
  }

  showExchangeRate() {
    this.isDisclaimer = !this.isDisclaimer;
    this.disclaimerMsg = `Exchange Rate : ${this.convertRate}`;
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    const current: string = event.target.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
