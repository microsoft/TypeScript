//// [tests/cases/conformance/types/contextualTypes/commaOperator/contextuallyTypeCommaOperator02.ts] ////

//// [contextuallyTypeCommaOperator02.ts]
let x: (a: string) => string;

x = (100, a => {
    const b: number = a;
    return b;
});

//// [contextuallyTypeCommaOperator02.js]
let x;
x = (100, a => {
    const b = a;
    return b;
});
