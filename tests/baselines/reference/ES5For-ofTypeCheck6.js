//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck6.ts] ////

//// [ES5For-ofTypeCheck6.ts]
var union: string[] | number[];
for (var v of union) { }

//// [ES5For-ofTypeCheck6.js]
var union;
for (var v of union) { }
