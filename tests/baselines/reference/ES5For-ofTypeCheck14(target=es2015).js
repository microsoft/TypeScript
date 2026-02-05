//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck14.ts] ////

//// [ES5For-ofTypeCheck14.ts]
declare var union: string | Set<number>
for (const e of union) { }

//// [ES5For-ofTypeCheck14.js]
"use strict";
for (const e of union) { }
