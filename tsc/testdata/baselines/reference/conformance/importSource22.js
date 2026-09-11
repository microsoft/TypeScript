//// [tests/cases/conformance/importSource/importSource22.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.mts]
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
const c: Promise<WebAssembly.Module> = import.source("./a.wasm");

//// [c.cts]
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
const c: Promise<WebAssembly.Module> = import.source("./a.wasm");


//// [b.mjs]
import source a from "./a.wasm";
const b = a;
const c = import.source("./a.wasm");
//// [c.cjs]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_wasm_1 = __importDefault(require("./a.wasm"));
const b = a_wasm_1.default;
const c = import.source("./a.wasm");
