//// [tests/cases/conformance/types/rest/objectRestNegative.ts] ////

//// [objectRestNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;

var b: string;
let notAssignable: { a: string };
({ b, ...notAssignable } = o);


function stillMustBeLast({ ...mustBeLast, a }: { a: number, b: string }): void {
}
function generic<T extends { x, y }>(t: T) {
    let { x, ...rest } = t;
    return rest;
}

let rest: { b: string }
({a, ...rest.b + rest.b} = o);


//// [objectRestNegative.js]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;
var b;
let notAssignable;
({ b, ...notAssignable } = o);
function stillMustBeLast({ ...mustBeLast, a }) {
}
function generic(t) {
    let { x, ...rest } = t;
    return rest;
}
let rest;
({ a, ...rest.b + rest.b } = o);
