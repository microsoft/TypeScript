//// [tests/cases/compiler/declarationEmitNonIdentifierExportName.ts] ////

//// [dep.ts]
interface A { x: number }
interface C { y: number }
export { A as "a b", C as "a c", C as Ok };

//// [mid.ts]
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;

//// [main.ts]
import { f, g } from "./mid";
export const v = f();
export const w = g();


//// [dep.js]
export {};
//// [mid.js]
export {};
//// [main.js]
import { f, g } from "./mid";
export const v = f();
export const w = g();


//// [dep.d.ts]
interface A {
    x: number;
}
interface C {
    y: number;
}
export { A as "a b", C as "a c", C as Ok };
//// [mid.d.ts]
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;
