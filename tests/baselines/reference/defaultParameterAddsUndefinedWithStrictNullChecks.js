//// [tests/cases/compiler/defaultParameterAddsUndefinedWithStrictNullChecks.ts] ////

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
    x.length; // ok, should be string
}
function foo3(x, b) {
    if (x === void 0) { x = "string"; }
    x.length; // ok, should be string
    x = undefined;
}
function foo4(x, b) {
    if (x === void 0) { x = undefined; }
    x; // should be string | undefined
    x = undefined;
}
function allowsNull(val) {
    if (val === void 0) { val = ""; }
    val = null;
    val = 'string and null are both ok';
}
allowsNull(null); // still allows passing null
// .d.ts should have `string | undefined` for foo1, foo2, foo3 and foo4
foo1(undefined, 1);
foo2(undefined, 1);
foo3(undefined, 1);
foo4(undefined, 1);
function removeUndefinedButNotFalse(x) {
    if (x === void 0) { x = true; }
    if (x === false) {
        return x;
    }
}
function removeNothing(y) {
    if (y === void 0) { y = cond ? true : undefined; }
    if (y !== undefined) {
        if (y === false) {
            return y;
        }
    }
    return true;
}


//// [defaultParameterAddsUndefinedWithStrictNullChecks.d.ts]
declare function f(addUndefined1?: string, addUndefined2?: number): number;
declare function g(addUndefined: string | undefined, addDefined: number): number;
declare let total: number;
declare function foo1(x: string | undefined, b: number): void;
declare function foo2(x: string | undefined, b: number): void;
declare function foo3(x: string | undefined, b: number): void;
declare function foo4(x: string | undefined, b: number): void;
type OptionalNullableString = string | null | undefined;
declare function allowsNull(val?: OptionalNullableString): void;
declare function removeUndefinedButNotFalse(x?: boolean): false | undefined;
declare const cond: boolean;
declare function removeNothing(y?: boolean | undefined): boolean;
