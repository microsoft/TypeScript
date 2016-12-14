// @strictNullChecks: true
// @declaration: true
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
