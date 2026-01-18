// @resolveJsonModule: true
// @esModuleInterop: true
// @module: commonjs
// @target: esnext
// @strict: true

// @Filename: data.json
{
    "s": "string literal",
    "n": 123,
    "b": true,
    "arr": ["a", "b"]
}

// @Filename: main.ts
import data from "./data.json";

// Should be wide types
const s: string = data.s;
const n: number = data.n;
const b: boolean = data.b;
const arr: string[] = data.arr;

// Should NOT be literal types (these assignments should fail if they were literals, but since we are assigning TO them, we check what they ARE)
// Actually, data.s is string. So `const x: "literal" = data.s` would fail if data.s is string.
// But here data.s IS string.
// Let's verify by assigning to literals which should fail if it is string.

const literalS: "string literal" = data.s; // Error expected: string not assignable to "string literal"
const literalN: 123 = data.n; // Error expected
const literalB: true = data.b; // Error expected
const literalArr: readonly ["a", "b"] = data.arr; // Error expected
