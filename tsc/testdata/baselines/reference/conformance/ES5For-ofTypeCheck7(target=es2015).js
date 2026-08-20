//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck7.ts] ////

//// [ES5For-ofTypeCheck7.ts]
declare var union: string | number;
for (var v of union) { }

//// [ES5For-ofTypeCheck7.js]
"use strict";
for (var v of union) { }
