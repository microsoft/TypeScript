//// [tests/cases/conformance/types/contextualTypes/commaOperator/contextuallyTypeCommaOperator01.ts] ////

//// [contextuallyTypeCommaOperator01.ts]
let x: (a: string) => string;

x = (100, a => a);

//// [contextuallyTypeCommaOperator01.js]
var x;
x = (100, function (a) { return a; });
