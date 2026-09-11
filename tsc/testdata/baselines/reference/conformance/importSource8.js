//// [tests/cases/conformance/importSource/importSource8.ts] ////

//// [a.d.wasm.ts]
export const a: number;

//// [b.ts]
import { a } from "./a.wasm";
import source b from "./a.wasm";

const c: number = a;
const d: WebAssembly.Module = b;
const e: Promise<WebAssembly.Module> = import.source("./a.wasm");


//// [b.js]
import { a } from "./a.wasm";
import source b from "./a.wasm";
const c = a;
const d = b;
const e = import.source("./a.wasm");
