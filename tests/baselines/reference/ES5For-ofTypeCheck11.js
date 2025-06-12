//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck11.ts] ////

//// [ES5For-ofTypeCheck11.ts]
var union: string | number[];
var v: string;
for (v of union) { }

//// [ES5For-ofTypeCheck11.js]
var union;
var v;
for (v of union) { }
