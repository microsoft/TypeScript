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

// Without importJsonAsConst, JSON properties have widened types.
const s: string = data.s;
const n: number = data.n;
const b: boolean = data.b;
const arr: string[] = data.arr;

// Assigning them to literal types therefore errors.
const literalS: "string literal" = data.s;
const literalN: 123 = data.n;
const literalB: true = data.b;
const literalArr: readonly ["a", "b"] = data.arr;
