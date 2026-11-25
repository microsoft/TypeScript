//// [tests/cases/compiler/declarationEmitNonIdentifierExportNameNamespaceImport.ts] ////

//// [dep.ts]
interface A { x: number }
interface C { y: number }
export { A as "a b", C as "a c", C as Ok };

//// [mid.ts]
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;

//// [main1.ts]
import * as dep from "./dep";
import { f } from "./mid";
export const v = f();

//// [main2.ts]
import * as dep from "./dep";
import { g } from "./mid";
export const w = g();


//// [dep.js]
export {};
//// [mid.js]
export {};
//// [main1.js]
import { f } from "./mid";
export const v = f();
//// [main2.js]
import { g } from "./mid";
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
//// [main2.d.ts]
import * as dep from "./dep";
export declare const w: dep.Ok;
