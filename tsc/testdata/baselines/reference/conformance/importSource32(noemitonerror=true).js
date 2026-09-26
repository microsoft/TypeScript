//// [tests/cases/conformance/importSource/importSource32.ts] ////

//// [package.json]
{ "main": "index.wasm" }

//// [index.wasm]

//// [package.json]
{ "main": "index.js" }

//// [index.js]
export default 1;

//// [c.ts]
export default 1;

//// [d.d.ts]
import source a from "./a.ts";
import source b from "./b.ts";
export { a, b };

//// [index.ts]
/// <reference path="d.d.ts" />
import source a from "./a.ts";
import source b from "./b.ts";
import source c from "./c.ts";
import source d from "./a.ts/index.wasm";
import type e from "./b.ts";
export { a, b, c, d };
export type T = typeof e;

export const f = import.source("./a.ts");
export const g = import.source("./b.ts");
export const h = import.source("./c.ts");
export const i = import.source("./a.ts/index.wasm");




!!!! File out/b.ts/index.d.ts missing from original emit, but present in noCheck emit
//// [index.d.ts]
declare const _default = 1;
export default _default;


!!!! File out/c.d.ts missing from original emit, but present in noCheck emit
//// [c.d.ts]
declare const _default = 1;
export default _default;


!!!! File out/index.d.ts missing from original emit, but present in noCheck emit
//// [index.d.ts]
import source a from "./a.ts";
import source b from "./b.ts";
import source c from "./c.ts";
import source d from "./a.ts/index.wasm";
import type e from "./b.ts";
export { a, b, c, d };
export type T = typeof e;
export declare const f: Promise<WebAssembly.Module>;
export declare const g: Promise<any>;
export declare const h: Promise<any>;
export declare const i: Promise<WebAssembly.Module>;


!!!! File out/b.ts/index.js missing from original emit, but present in noCheck emit
//// [index.js]
export default 1;


!!!! File out/c.js missing from original emit, but present in noCheck emit
//// [c.js]
export default 1;


!!!! File out/index.js missing from original emit, but present in noCheck emit
//// [index.js]
/// <reference path="d.d.ts" />
import source a from "./a.js";
import source b from "./b.js";
import source c from "./c.js";
import source d from "./a.ts/index.wasm";
export { a, b, c, d };
export const f = import.source("./a.js");
export const g = import.source("./b.js");
export const h = import.source("./c.js");
export const i = import.source("./a.ts/index.wasm");
