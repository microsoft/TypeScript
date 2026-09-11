//// [tests/cases/conformance/importSource/importSource20.ts] ////

//// [package.json]
{"name":"a","exports":{"types":"./index.d.ts","default":"./a.wasm"}}

//// [index.d.ts]
declare const a: string;
export default a;

//// [a.wasm]

//// [b.ts]
import a from "a";
import source b from "a";
const c: string = a;
const d: WebAssembly.Module = b;

const e = import.source("a");
const f: Promise<WebAssembly.Module> = e;


//// [b.js]
import a from "a";
import source b from "a";
const c = a;
const d = b;
const e = import.source("a");
const f = e;
