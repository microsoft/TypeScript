//// [tests/cases/conformance/types/rest/objectRestCatchES5.ts] ////

//// [objectRestCatchES5.ts]
let a = 1, b = 2;
try {} catch ({ a, ...b }) {}

//// [objectRestCatchES5.js]
let a = 1, b = 2;
try { }
catch ({ a, ...b }) { }
