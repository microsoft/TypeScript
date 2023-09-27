// @module: esnext
// @lib: es2015

// @filename: /a.ts
export default {
    a: "a",
    b: "b",
    1: "1",
}

// @filename: /b.ts
import a from "./a" with { a: "a", "b": "b" };

export async function f() {
    const a = import("./a", {
        with: { a: "a", "b": "b" },
    });
    a;
}
