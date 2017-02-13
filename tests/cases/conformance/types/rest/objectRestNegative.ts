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

var noContextualType = ({ aNumber = 12, ...notEmptyObject }) => aNumber + notEmptyObject.anythingGoes;

function computed<T extends { x: number, y: string }>(t: T, x: string) {
    let { [x]: first, ...rest } = t; // error, computed causes rest to implicitly be any
    ({ [x]: first, ...rest } = t);
    return [first, rest];
}
let x: string;
let { [x]: x1, ...unknownRest } = o; // error, computed causes rest to implicitly be any
({[x]: x1, ...unknownRest } = o);
let { [x]: x2, ...explicitRest } = o as any; // ok, source is any
({[x]: x2, ...explicitRest } = o as any);
let { ['a']: justA, ...knownRest } = o; // ok, 'a' is a constant
