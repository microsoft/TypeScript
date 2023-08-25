//// [tests/cases/conformance/importAttributes/importAttributes8.ts] ////

//// [a.ts]
export default {
    a: "a",
    b: "b",
    1: "1",
}

//// [b.ts]
import a from "./a"
with { a: "a", "b": "b", 1: "1" }; // ok


//// [a.js]
export default {
    a: "a",
    b: "b",
    1: "1",
};
//// [b.js]
export {};
