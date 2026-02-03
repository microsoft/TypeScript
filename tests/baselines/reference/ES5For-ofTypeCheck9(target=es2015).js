//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck9.ts] ////

//// [ES5For-ofTypeCheck9.ts]
declare var union: string | string[] | number | symbol;
for (let v of union) { }

//// [ES5For-ofTypeCheck9.js]
"use strict";
for (let v of union) { }
