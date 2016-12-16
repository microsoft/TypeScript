//// [defaultParameterAddsUndefinedWithStrictNullChecks.ts]
function f(addUndefined1 = "J", addUndefined2?: number) {
    return addUndefined1.length + (addUndefined2 || 0);
}
function g(addUndefined = "J", addDefined: number) {
    return addUndefined.length + addDefined;
}
let total = f() + f('a', 1) + f('b') + f(undefined, 2);
total = g('c', 3) + g(undefined, 4);

function foo1(x: string = "string", b: number) {
    x.length;
}

function foo2(x: string | undefined = "string", b: number) {
    x.length; // ok, should be narrowed to string
}

function foo3(x = "string", b: number) {
    x.length; // ok, should be narrowed to string
}

foo1(undefined, 1);
foo2(undefined, 1);
foo3(undefined, 1);


// .d.ts should have `T | undefined` for all of them
// need to remove special-case code to allow calling foo1(undefined) for x: string = "string"


//// [defaultParameterAddsUndefinedWithStrictNullChecks.js]
function f(addUndefined1, addUndefined2) {
    if (addUndefined1 === void 0) { addUndefined1 = "J"; }
    return addUndefined1.length + (addUndefined2 || 0);
}
function g(addUndefined, addDefined) {
    if (addUndefined === void 0) { addUndefined = "J"; }
    return addUndefined.length + addDefined;
}
var total = f() + f('a', 1) + f('b') + f(undefined, 2);
total = g('c', 3) + g(undefined, 4);
function foo1(x, b) {
    if (x === void 0) { x = "string"; }
    x.length;
}
function foo2(x, b) {
    if (x === void 0) { x = "string"; }
    x.length; // ok, should be narrowed to string
}
function foo3(x, b) {
    if (x === void 0) { x = "string"; }
    x.length; // ok, should be narrowed to string
}
foo1(undefined, 1);
foo2(undefined, 1);
foo3(undefined, 1);
// .d.ts should have `T | undefined` for all of them
// need to remove special-case code to allow calling foo1(undefined) for x: string = "string"


//// [defaultParameterAddsUndefinedWithStrictNullChecks.d.ts]
declare function f(addUndefined1?: string | undefined, addUndefined2?: number): number;
declare function g(addUndefined: string | undefined, addDefined: number): number;
declare let total: number;
declare function foo1(x: string | undefined, b: number): void;
declare function foo2(x: string | undefined, b: number): void;
declare function foo3(x: string | undefined, b: number): void;
