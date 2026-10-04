//// [tests/cases/conformance/es6/Symbols/symbolType2.ts] ////

//// [symbolType2.ts]
Symbol.isConcatSpreadable in {};
"" in Symbol.toPrimitive;

//// [symbolType2.js]
"use strict";
Symbol.isConcatSpreadable in {};
"" in Symbol.toPrimitive;
