//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck4.ts] ////

//// [ES5For-ofTypeCheck4.ts]
var union: string | string[];
for (const v of union) { }

//// [ES5For-ofTypeCheck4.js]
"use strict";
var union;
for (const v of union) { }
