//// [tests/cases/compiler/jsonLiteralTypesDefault.ts] ////

//// [data.json]
{
    "s": "string literal",
    "n": 123,
    "b": true,
    "arr": ["a", "b"]
}

//// [main.ts]
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


//// [main.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
// Should be wide types
const s = data_json_1.default.s;
const n = data_json_1.default.n;
const b = data_json_1.default.b;
const arr = data_json_1.default.arr;
// Should NOT be literal types (these assignments should fail if they were literals, but since we are assigning TO them, we check what they ARE)
// Actually, data.s is string. So `const x: "literal" = data.s` would fail if data.s is string.
// But here data.s IS string.
// Let's verify by assigning to literals which should fail if it is string.
const literalS = data_json_1.default.s; // Error expected: string not assignable to "string literal"
const literalN = data_json_1.default.n; // Error expected
const literalB = data_json_1.default.b; // Error expected
const literalArr = data_json_1.default.arr; // Error expected
