// @noImplicitAny: true
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
