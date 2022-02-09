// @target: esnext
// @lib: esnext
// @strict: true
const options = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
const currencySign = options.currencySign;
