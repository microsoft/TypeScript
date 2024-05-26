//// [tests/cases/compiler/typeReferenceDirectives11.ts] ////

//// [index.d.ts]
interface Lib { x }

//// [mod1.ts]
export function foo(): Lib { return {x: 1} }

//// [mod2.ts]
import {foo} from "./mod1";
export const bar = foo();




!!!! File /output.d.ts missing from original emit, but present in noCheck emit
//// [output.d.ts]
declare module "mod1" {
    export function foo(): Lib;
}
declare module "mod2" {
    export const bar: Lib;
}
