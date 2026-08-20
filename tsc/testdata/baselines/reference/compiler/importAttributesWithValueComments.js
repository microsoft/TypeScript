//// [tests/cases/compiler/importAttributesWithValueComments.ts] ////

//// [a.ts]
export default {
    a: "a",
    b: "b",
    1: "1",
}

//// [b.ts]
import a from "./a" with { a: /* a */ "a", "b": /* b */ "b" };
a;


//// [a.js]
export default {
    a: "a",
    b: "b",
    1: "1",
};
//// [b.js]
import a from "./a" with { a: /* a */ "a", "b": /* b */ "b" };
a;
