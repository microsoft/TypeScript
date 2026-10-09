//// [tests/cases/compiler/recursiveArrayTupleDeclarationEmit.ts] ////

//// [recursiveArrayTupleDeclarationEmit.ts]
type G<T> = T extends unknown ? (T | G<[T]>)[] : never;
declare const g: G<"x">;
export const h = g;


//// [recursiveArrayTupleDeclarationEmit.js]
export const h = g;
