// @strict: true
// @noEmit: true

type A = { type: "A" };
type B = { type: "B" };
type C = { type: "C" };
type MyUnion = A | B | C;

const isA = (x: MyUnion): x is A => x.type === "A";

function test1(x: MyUnion) {
    if (isA(x) !== true) {
        x
    }

    if (isA(x) !== false) {
        x
    }

    if (isA(x) === false) {
        x
    }

    if (isA(x) === true) {
        x
    }

    if (isA(x) != true) {
        x
    }

    if (isA(x) == true) {
        x
    }

    if (true !== isA(x)) {
        x
    }

    if (true === isA(x)) {
        x
    }
}