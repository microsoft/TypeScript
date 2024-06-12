//// [tests/cases/conformance/es2017/es2017IntlAPIs.ts] ////

//// [es2017IntlAPIs.ts]
Intl.DateTimeFormat('en').formatToParts()[0];
Intl.DateTimeFormat('en').formatToParts(new Date())[0];
Intl.DateTimeFormat('en').formatToParts(Date.now())[0];


//// [es2017IntlAPIs.js]
Intl.DateTimeFormat('en').formatToParts()[0];
Intl.DateTimeFormat('en').formatToParts(new Date())[0];
Intl.DateTimeFormat('en').formatToParts(Date.now())[0];
