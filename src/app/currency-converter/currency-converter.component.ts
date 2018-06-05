import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

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
  private specialKey: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

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
          // if (key !== this.selectedBase) {
          this.currencyConvertList.push({ label: key, value: key });
          // }
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
    this.convertRate = this.rateList[this.selectedConvert];
    this.clearInputs();
  }

  onKeyUpBase(e) {
    this.convertValue = this.formatValue(this.convertRate * e);
  }

  onKeyUpConvert(e) {
    this.baseValue = this.formatValue(e / this.convertRate);
  }
  formatValue(number) {
    return number.toFixed(2);
  }
  showExchangeRate() {
    this.isDisclaimer = !this.isDisclaimer;
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    if (this.specialKey.indexOf(event.key) !== -1) {
      return;
    }
    // const currentCursorPos = this.el.nativeElement.selectionStart;
    const dotLength: number = event.target.value.replace(/[^\.]/g, '').length;
    const decimalLength = event.target.value.split('.')[1]
      ? event.target.value.split('.')[1].length
      : 0;
    const current: string = event.target.value;
    const next: string = current.concat(event.key);
    if (
      (next && !String(next).match(this.regex)) ||
      (dotLength === 1 && event.key === '.')
      // ||(decimalLength > 1 && currentCursorPos > event.target.value.indexOf("."))
    ) {
      event.preventDefault();
    }
  }
}
