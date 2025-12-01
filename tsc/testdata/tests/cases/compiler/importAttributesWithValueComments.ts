// @target: esnext
// @module: esnext

// @filename: /a.ts
export default {
    a: "a",
    b: "b",
    1: "1",
}

// @filename: /b.ts
import a from "./a" with { a: /* a */ "a", "b": /* b */ "b" };
a;
