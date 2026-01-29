//// [tests/cases/compiler/globalThisDeclarationEmit2.ts] ////

//// [index.ts]
import { variable } from "./variable";
export { variable as globalThis };

//// [variable.ts]
export const variable = globalThis;

//// [variable.js]
export const variable = globalThis;
//// [index.js]
import { variable } from "./variable";
export { variable as globalThis };


//// [variable.d.ts]
export declare const variable: typeof globalThis;
//// [index.d.ts]
import { variable } from "./variable";
export { variable as globalThis };
