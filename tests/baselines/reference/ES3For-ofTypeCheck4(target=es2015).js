//// [tests/cases/conformance/statements/for-ofStatements/ES3For-ofTypeCheck4.ts] ////

//// [ES3For-ofTypeCheck4.ts]
var union: string | string[];
for (const v of union) { }

//// [ES3For-ofTypeCheck4.js]
var union;
for (const v of union) { }
