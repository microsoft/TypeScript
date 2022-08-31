//// [nonStrictUnknownLooksLikeEmptyObject.ts]
declare var a: { x?: number, y?: number };
declare var b: unknown; // direct unknown

a = b;

// unknown via failed inference
declare function f1<T>(x?: T): T;
const res = f1();
a = res;


//// [nonStrictUnknownLooksLikeEmptyObject.js]
a = b;
var res = f1();
a = res;
