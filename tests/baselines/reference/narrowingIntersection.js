//// [narrowingIntersection.ts]
// Somehow this being an intersection matters.
type FooAndBaz = { foo: unknown } & { baz: unknown };

type Disjoint =
 | { readonly value: string; readonly err?: never; }
 | { readonly value?: never; readonly err: FooAndBaz; };

function test1(result: Disjoint): string {
    if (result.err) {
        throw result.err;
    }
    // Error, should OK
    return result.value;
}

type TrivialIntersection = { a: 1 } & { a: 1 };

function want0(x: 0) {}

function test2(a: 0 | TrivialIntersection) {
    if (a === 0) {
        want0(a); // Fails, but expect to work
    }
}

//// [narrowingIntersection.js]
function test1(result) {
    if (result.err) {
        throw result.err;
    }
    // Error, should OK
    return result.value;
}
function want0(x) { }
function test2(a) {
    if (a === 0) {
        want0(a); // Fails, but expect to work
    }
}
