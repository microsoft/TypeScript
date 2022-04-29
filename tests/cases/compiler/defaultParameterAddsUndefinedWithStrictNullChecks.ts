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

function foo2(x = "string", b: number) {
    x.length; // ok, should be string
}

function foo3(x: string | undefined = "string", b: number) {
    x.length; // ok, should be string
    x = undefined;
}

function foo4(x: string | undefined = undefined, b: number) {
    x; // should be string | undefined
    x = undefined;
}

type OptionalNullableString = string | null | undefined;
function allowsNull(val: OptionalNullableString = "") {
    val = null;
    val = 'string and null are both ok';
}
allowsNull(null); // still allows passing null



// .d.ts should have `string | undefined` for foo1, foo2, foo3 and foo4
foo1(undefined, 1);
foo2(undefined, 1);
foo3(undefined, 1);
foo4(undefined, 1);


function removeUndefinedButNotFalse(x = true) {
    if (x === false) {
        return x;
    }
}

declare const cond: boolean;
function removeNothing(y = cond ? true : undefined) {
    if (y !== undefined) {
        if (y === false) {
            return y;
        }
    }
    return true;
}
