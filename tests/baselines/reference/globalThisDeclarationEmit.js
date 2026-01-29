//// [tests/cases/compiler/globalThisDeclarationEmit.ts] ////

//// [index.ts]
import { variable } from "./variable";
export const globalThis = variable;

//// [variable.ts]
export const variable = globalThis;

//// [variable.js]
export const variable = globalThis;
//// [index.js]
import { variable } from "./variable";
export const globalThis = variable;


//// [variable.d.ts]
export declare const variable: typeof globalThis;
