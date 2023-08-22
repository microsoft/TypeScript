//// [tests/cases/conformance/types/contextualTypes/commaOperator/contextuallyTypeCommaOperator02.ts] ////

//// [contextuallyTypeCommaOperator02.ts]
let x: (a: string) => string;

x = (100, a => {
    const b: number = a;
    return b;
});

//// [contextuallyTypeCommaOperator02.js]
var x;
x = (100, function (a) {
    var b = a;
    return b;
});
