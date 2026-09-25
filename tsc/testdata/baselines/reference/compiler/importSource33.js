//// [tests/cases/compiler/importSource33.ts] ////

//// [package.json]
{
    "name": "a.d.ts",
    "exports": {
        ".": { "types": "./index.d.ts", "default": "./a.wasm" },
        "./b.d.ts": { "types": "./index.d.ts", "default": "./a.wasm" },
        "./c.d.ts": "./c.wasm",
        "./*": "./*"
    }
}

//// [index.d.ts]
declare const a: string;
export default a;

//// [a.wasm]

//// [c.d.wasm.ts]
export {};

//// [package.json]
{ "name": "@a/b.d.ts", "exports": "./a.wasm" }

//// [a.wasm]

//// [index.ts]
import a from "a.d.ts";
import source b from "a.d.ts";
import source c from "a.d.ts/b.d.ts";
import source d from "a.d.ts/c.d.ts";
import source e from "@a/b.d.ts";

export const f: string = a;
export const g: WebAssembly.Module = b;
export const h: WebAssembly.Module = c;
export const i: WebAssembly.Module = d;
export const j: WebAssembly.Module = e;

export const k = import.source("a.d.ts");
export const l = import.source("a.d.ts/b.d.ts");
export const m = import.source("a.d.ts/c.d.ts");
export const n = import.source("@a/b.d.ts");
export { a, b, c, d, e };

import source o from "a.d.ts/c.d.wasm.ts";
import.source("a.d.ts/c.d.wasm.ts");


//// [index.js]
import a from "a.d.ts";
import source b from "a.d.ts";
import source c from "a.d.ts/b.d.ts";
import source d from "a.d.ts/c.d.ts";
import source e from "@a/b.d.ts";
export const f = a;
export const g = b;
export const h = c;
export const i = d;
export const j = e;
export const k = import.source("a.d.ts");
export const l = import.source("a.d.ts/b.d.ts");
export const m = import.source("a.d.ts/c.d.ts");
export const n = import.source("@a/b.d.ts");
export { a, b, c, d, e };
import.source("a.d.ts/c.d.wasm.ts");


//// [index.d.ts]
import a from "a.d.ts";
import source b from "a.d.ts";
import source c from "a.d.ts/b.d.ts";
import source d from "a.d.ts/c.d.ts";
import source e from "@a/b.d.ts";
export declare const f: string;
export declare const g: WebAssembly.Module;
export declare const h: WebAssembly.Module;
export declare const i: WebAssembly.Module;
export declare const j: WebAssembly.Module;
export declare const k: Promise<WebAssembly.Module>;
export declare const l: Promise<WebAssembly.Module>;
export declare const m: Promise<WebAssembly.Module>;
export declare const n: Promise<WebAssembly.Module>;
export { a, b, c, d, e };
