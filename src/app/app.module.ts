import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NglModule} from 'ng-lightning/ng-lightning';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from './shared/currency.service';
import { DropdownModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@NgModule({
  declarations: [AppComponent, CurrencyConverterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
