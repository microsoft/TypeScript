//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck5.ts] ////

//// [ES5For-ofTypeCheck5.ts]
var union: string | number[];
for (var v of union) { }

//// [ES5For-ofTypeCheck5.js]
"use strict";
var union;
for (var v of union) { }
