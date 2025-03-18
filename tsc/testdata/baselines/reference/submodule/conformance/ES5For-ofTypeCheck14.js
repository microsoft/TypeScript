//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck14.ts] ////

//// [ES5For-ofTypeCheck14.ts]
var union: string | Set<number>
for (const e of union) { }

//// [ES5For-ofTypeCheck14.js]
var union;
for (const e of union) { }
