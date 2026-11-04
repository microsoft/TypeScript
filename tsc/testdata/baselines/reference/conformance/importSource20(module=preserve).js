//// [tests/cases/conformance/importSource/importSource20.ts] ////

//// [package.json]
{ "type": "module", "exports": { "types": "./index.d.ts", "default": "./missing.wasm" } }

//// [index.d.ts]
export const value: number;

//// [index.mts]
import source a from "pkg";
import { value } from "pkg";
const b: AbstractModuleSource = a;
const c: number = value;
export const d = import.source("pkg");
export const e = import("pkg");
export { a };


//// [index.mjs]
import source a from "pkg";
import { value } from "pkg";
const b = a;
const c = value;
export const d = import.source("pkg");
export const e = import("pkg");
export { a };


//// [index.d.mts]
import source a from "pkg";
export declare const d: Promise<AbstractModuleSource>;
export declare const e: Promise<typeof import("pkg")>;
export { a };
