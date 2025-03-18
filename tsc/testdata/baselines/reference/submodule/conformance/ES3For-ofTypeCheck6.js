//// [tests/cases/conformance/statements/for-ofStatements/ES3For-ofTypeCheck6.ts] ////

//// [ES3For-ofTypeCheck6.ts]
var union: string[] | number[];
for (var v of union) { }

//// [ES3For-ofTypeCheck6.js]
var union;
for (var v of union) { }
