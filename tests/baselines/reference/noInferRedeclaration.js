//// [tests/cases/conformance/types/typeRelationships/typeInference/noInferRedeclaration.ts] ////

//// [a.ts]
export const f = <T>(x: T, y: NoInfer<T>) => x;

//// [b.ts]
import { f } from "./a";

type NoInfer<T> = T & number;

export const g = f;


//// [a.js]
export const f = (x, y) => x;
//// [b.js]
import { f } from "./a";
export const g = f;


//// [a.d.ts]
export declare const f: <T>(x: T, y: NoInfer<T>) => T;
//// [b.d.ts]
export declare const g: <T>(x: T, y: globalThis.NoInfer<T>) => T;
