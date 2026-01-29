//// [tests/cases/compiler/typeReferenceDirectives8.ts] ////

//// [index.d.ts]
interface Lib { x }

//// [mod1.ts]
export function foo(): Lib { return {x: 1} }

//// [mod2.ts]
import {foo} from "./mod1";
export const bar = foo();

//// [mod1.js]
export function foo() { return { x: 1 }; }
//// [mod2.js]
import { foo } from "./mod1";
export const bar = foo();


//// [mod1.d.ts]
export declare function foo(): Lib;
//// [mod2.d.ts]
export declare const bar: Lib;
