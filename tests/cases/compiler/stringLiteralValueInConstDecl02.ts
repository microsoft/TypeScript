// @noImplicitAny: true
// @module: es2015

const foo = "foo";
const bar = "bar";

declare function randBool(): boolean;

export function fooOrBar1() {
    if (randBool()) {
        return foo;
    }
    else {
        return bar;
    }
}

export function fooOrBar2() {
    return randBool() ? foo : bar;
}