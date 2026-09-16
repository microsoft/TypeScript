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


//// [main.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
// Without importJsonAsConst, JSON properties have widened types.
const s = data_json_1.default.s;
const n = data_json_1.default.n;
const b = data_json_1.default.b;
const arr = data_json_1.default.arr;
// Assigning them to literal types therefore errors.
const literalS = data_json_1.default.s;
const literalN = data_json_1.default.n;
const literalB = data_json_1.default.b;
const literalArr = data_json_1.default.arr;
