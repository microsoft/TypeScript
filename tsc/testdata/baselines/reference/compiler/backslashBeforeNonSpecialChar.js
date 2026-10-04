//// [tests/cases/compiler/backslashBeforeNonSpecialChar.ts] ////

//// [backslashBeforeNonSpecialChar.ts]
const enum Currency {
  Euro = "\€",
}

const currency = Currency.Euro;


//// [backslashBeforeNonSpecialChar.js]
"use strict";
const currency = "\u20AC" /* Currency.Euro */;
