//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck8.ts] ////

//// [ES5For-ofTypeCheck8.ts]
var union: string | string[]| number[]| symbol[];
var v: symbol;
for (v of union) { }

//// [ES5For-ofTypeCheck8.js]
var union;
var v;
for (v of union) { }
