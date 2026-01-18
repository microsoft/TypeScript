// @resolveJsonModule: true
// @esModuleInterop: true
// @module: commonjs
// @target: esnext
// @strict: true
// @importJsonAsConst: true

// @Filename: data.json
{
    "s": "string literal",
    "n": 123,
    "b": true,
    "arr": ["a", "b"]
}

// @Filename: main.ts
import data from "./data.json";

const s: "string literal" = data.s;
const n: 123 = data.n;
const b: true = data.b;
const arr: readonly ["a", "b"] = data.arr;
