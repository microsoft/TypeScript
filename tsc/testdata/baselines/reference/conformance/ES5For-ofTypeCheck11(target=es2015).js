//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck11.ts] ////

//// [ES5For-ofTypeCheck11.ts]
declare var union: string | number[];
var v: string;
for (v of union) { }

//// [ES5For-ofTypeCheck11.js]
"use strict";
var v;
for (v of union) { }
