// @module: esnext
// @lib: es2015

// @filename: /a.ts
export default {
    a: "a",
    b: "b",
}

// @filename: /b.ts
import a from "./a" with { a: "a", "b": "b" }; // ok
