//// [tests/cases/conformance/importSource/importSource16.ts] ////

//// [index.mts]
import source a from "./missing.wasm";
import source b from "missing";
import source c from "./a.txt";
import source d from "./a.js";
import source e from "./a.d.ts";
import source f from "./a.ts";
export { a, b, c, d, e, f };
const sources: AbstractModuleSource[] = [a, b, c, d, e, f];
export const g = import.source("./missing.wasm");
export const h = import.source("missing");
export const i = import.source("./a.txt");
export function load(path: string): Promise<AbstractModuleSource> {
    return import.source(path);
}


//// [index.mjs]
import source a from "./missing.wasm";
import source b from "missing";
import source c from "./a.txt";
import source d from "./a.js";
import source e from "./a.d.ts";
import source f from "./a.ts";
export { a, b, c, d, e, f };
const sources = [a, b, c, d, e, f];
export const g = import.source("./missing.wasm");
export const h = import.source("missing");
export const i = import.source("./a.txt");
export function load(path) {
    return import.source(path);
}


//// [index.d.mts]
import source a from "./missing.wasm";
import source b from "missing";
import source c from "./a.txt";
import source d from "./a.js";
import source e from "./a.d.ts";
import source f from "./a.ts";
export { a, b, c, d, e, f };
export declare const g: Promise<AbstractModuleSource>;
export declare const h: Promise<AbstractModuleSource>;
export declare const i: Promise<AbstractModuleSource>;
export declare function load(path: string): Promise<AbstractModuleSource>;
