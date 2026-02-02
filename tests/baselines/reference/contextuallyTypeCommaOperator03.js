//// [tests/cases/conformance/types/contextualTypes/commaOperator/contextuallyTypeCommaOperator03.ts] ////

//// [contextuallyTypeCommaOperator03.ts]
let x: (a: string) => string;

x = (a => a, b => b);

//// [contextuallyTypeCommaOperator03.js]
let x;
x = (a => a, b => b);
