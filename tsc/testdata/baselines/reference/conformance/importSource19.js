//// [tests/cases/conformance/importSource/importSource19.ts] ////

//// [globals.d.ts]
declare module "*.wasm" {
    const value: string;
    export default value;
}
declare namespace WebAssembly {
    interface Module { value: number; }
}

//// [index.ts]
import a from "./a.wasm";
import source b from "./a.wasm";
const c: string = a;
const d: AbstractModuleSource = b;
export { b };
export const e = import.source("./a.wasm");


//// [index.js]
import a from "./a.wasm";
import source b from "./a.wasm";
const c = a;
const d = b;
export { b };
export const e = import.source("./a.wasm");


//// [index.d.ts]
import source b from "./a.wasm";
export { b };
export declare const e: Promise<AbstractModuleSource>;
