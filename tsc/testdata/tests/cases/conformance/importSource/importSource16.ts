// @module: esnext, nodenext, preserve
// @target: esnext
// @strict: true
// @noUncheckedSideEffectImports: false, true
// @declaration: true

// @filename: index.mts
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
