//// [tests/cases/compiler/formatToPartsFractionalSecond.ts] ////

//// [formatToPartsFractionalSecond.ts]
new Intl.DateTimeFormat().formatToParts().find((val) => val.type === 'fractionalSecond')

//// [formatToPartsFractionalSecond.js]
"use strict";
new Intl.DateTimeFormat().formatToParts().find((val) => val.type === 'fractionalSecond');
