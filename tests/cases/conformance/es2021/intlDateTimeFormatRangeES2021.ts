// @lib: es2021

new Intl.DateTimeFormat().formatRange(new Date(0), new Date());
const [ part ] = new Intl.DateTimeFormat().formatRangeToParts(1000, 1000000000);
