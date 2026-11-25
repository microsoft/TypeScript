//// [tests/cases/compiler/declarationEmitNonIdentifierExportNameBarrel.ts] ////

//// [a.d.ts]
interface A { x: number }
export { A as Ok };

//// [index.d.ts]
export { Ok as "a b" } from "./src/internal/a";

//// [index.d.ts]
import { Ok } from "dep/src/internal/a";
export declare function f(): Ok;

//// [main.ts]
import { f } from "mid";
export const v = f();


//// [main.js]
import { f } from "mid";
export const v = f();


//// [main.d.ts]
export declare const v: import("dep/src/internal/a").Ok;
