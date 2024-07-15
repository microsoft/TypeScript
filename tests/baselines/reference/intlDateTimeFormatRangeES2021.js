//// [tests/cases/conformance/es2021/intlDateTimeFormatRangeES2021.ts] ////

//// [intlDateTimeFormatRangeES2021.ts]
new Intl.DateTimeFormat().formatRange(new Date(0), new Date());
const [ part ] = new Intl.DateTimeFormat().formatRangeToParts(1000, 1000000000);


//// [intlDateTimeFormatRangeES2021.js]
new Intl.DateTimeFormat().formatRange(new Date(0), new Date());
var part = new Intl.DateTimeFormat().formatRangeToParts(1000, 1000000000)[0];
