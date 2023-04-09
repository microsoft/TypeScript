// @strict: true
// @noEmit: true

type A = { type: "A" };
type B = { type: "B" };
type C = { type: "C" };
type MyUnion = A | B | C;

const isA = (x: MyUnion): x is A => x.type === "A";

function test1(x: MyUnion) {
    if (isA(x) !== true) {
        x;
    }

    if (isA(x) !== false) {
        x;
    }

    if (isA(x) === false) {
        x;
    }

    if (isA(x) === true) {
        x;
    }

    if (isA(x) != true) {
        x;
    }

    if (isA(x) == true) {
        x;
    }

    if (true !== isA(x)) {
        x;
    }

    if (true === isA(x)) {
        x;
    }
}

// https://github.com/microsoft/TypeScript/issues/53093
function test2(x: unknown) {
    if (x instanceof Error === false) {
        return;
    }
    x;
}

// https://github.com/microsoft/TypeScript/issues/50712
function test3(foo: unknown) {
    if (typeof foo !== 'string' && Array.isArray(foo) === false) {
        throw new Error('Not a string or an array');
    }
    foo;
}
