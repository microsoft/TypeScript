//// [tests/cases/conformance/importSource/importSource7.ts] ////

//// [a.d.wasm.ts]
export const a: number;

//// [b.ts]
import { a } from "./a.wasm";
import source b from "./a.wasm";

const c: number = a;
const d: AbstractModuleSource = b;
const e: Promise<AbstractModuleSource> = import.source("./a.wasm");


//// [b.js]
import { a } from "./a.wasm";
import source b from "./a.wasm";
const c = a;
const d = b;
const e = import.source("./a.wasm");
