//// [tests/cases/conformance/importAttributes/importAttributes7.ts] ////

//// [a.ts]
export default {
    a: "a",
    b: "b",
    1: "1",
}

//// [b.ts]
import a from "./a" with { a: "a", "b": "b" };

export async function f() {
    const a = import("./a", {
        with: { a: "a", "b": "b" },
    });
    a;
}


//// [a.js]
export default {
    a: "a",
    b: "b",
    1: "1",
};
//// [b.js]
export async function f() {
    const a = import("./a", {
        with: { a: "a", "b": "b" },
    });
    a;
}
