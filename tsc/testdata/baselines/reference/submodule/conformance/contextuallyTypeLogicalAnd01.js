//// [tests/cases/conformance/types/contextualTypes/logicalAnd/contextuallyTypeLogicalAnd01.ts] ////

//// [contextuallyTypeLogicalAnd01.ts]
let x: (a: string) => string;
let y = true;

x = y && (a => a);

//// [contextuallyTypeLogicalAnd01.js]
let x;
let y = true;
x = y && (a => a);
