//// [tests/cases/conformance/types/contextualTypes/logicalAnd/contextuallyTypeLogicalAnd02.ts] ////

//// [contextuallyTypeLogicalAnd02.ts]
let x: (a: string) => string;
let y = true;

x = y && (a => {
    const b: number = a;
    return b;
});

//// [contextuallyTypeLogicalAnd02.js]
var x;
var y = true;
x = y && (function (a) {
    var b = a;
    return b;
});
