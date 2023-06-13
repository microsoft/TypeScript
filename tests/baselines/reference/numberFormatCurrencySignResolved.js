//// [tests/cases/conformance/es2020/numberFormatCurrencySignResolved.ts] ////

//// [numberFormatCurrencySignResolved.ts]
const options = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
const currencySign = options.currencySign;


//// [numberFormatCurrencySignResolved.js]
"use strict";
const options = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
const currencySign = options.currencySign;
