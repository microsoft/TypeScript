// @module: esnext
// @target: esnext
// @strict: true
// @declaration: true

// @filename: globals.d.ts
declare module "*.wasm" {
    const value: string;
    export default value;
}
declare namespace WebAssembly {
    interface Module { value: number; }
}

// @filename: index.ts
import a from "./a.wasm";
import source b from "./a.wasm";
const c: string = a;
const d: AbstractModuleSource = b;
export { b };
export const e = import.source("./a.wasm");
