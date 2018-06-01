import { Component, OnInit } from '@angular/core';

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
  selectedBase = 'CAD';
  selectedConvert = 'USD';
  convertRate;
  rateList: Rate[];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this.currencyService.getRates(this.selectedBase).subscribe(
      response => {
        this.currencyBaseList = [];
        this.currencyConvertList = [];
        this.rateList = Object.values(response)[3];
        this.currencyBaseList.push({
          label: this.selectedBase,
          value: this.selectedBase
        });
        this.convertRate = this.rateList[this.selectedConvert];

        Object.keys(this.rateList).forEach(key => {
          if (key !== this.selectedConvert) {
            this.currencyBaseList.push({ label: key, value: key });
          }
        });

        Object.keys(this.rateList).forEach(key => {
          if (key !== this.selectedBase) {
            this.currencyConvertList.push({ label: key, value: key });
          }
        });
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

  // formatValue(num) {
  //   return Number(Math.round(num * 100) / 100);
  // }
}
