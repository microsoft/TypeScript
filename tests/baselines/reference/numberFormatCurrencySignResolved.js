//// [numberFormatCurrencySignResolved.ts]
const options = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
const currencySign = options.currencySign;


//// [numberFormatCurrencySignResolved.js]
var options = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
var currencySign = options.currencySign;
