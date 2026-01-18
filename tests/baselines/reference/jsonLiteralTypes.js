//// [tests/cases/compiler/jsonLiteralTypes.ts] ////

//// [data.json]
{
    "s": "string literal",
    "n": 123,
    "b": true,
    "arr": ["a", "b"]
}

//// [main.ts]
import data from "./data.json";

const s: "string literal" = data.s;
const n: 123 = data.n;
const b: true = data.b;
const arr: readonly ["a", "b"] = data.arr;


//// [main.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const s = data_json_1.default.s;
const n = data_json_1.default.n;
const b = data_json_1.default.b;
const arr = data_json_1.default.arr;
