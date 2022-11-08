//// [numberFormatCurrencySign.ts]
const str = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).format(999999);


//// [numberFormatCurrencySign.js]
"use strict";
const str = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).format(999999);
