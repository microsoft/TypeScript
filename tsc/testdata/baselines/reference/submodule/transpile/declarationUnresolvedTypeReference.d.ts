//// [declarationUnresolvedTypeReference.ts] ////
import { type Type } from "./a";

export const foo = (_: Type): void => {};
export const bar = (_: import("./a").Type): void => {};
//// [declarationUnresolvedTypeReference.d.ts] ////
import { type Type } from "./a";
export declare const foo: (_: Type) => void;
export declare const bar: (_: import("./a").Type) => void;
