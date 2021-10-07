//// [tupleIntersectionArity.ts]
declare const tuple1: [number, number, number] & { _nominal_a: never };
declare const tuple2: [number, number, number] & [string, string, string];

declare const f1: (...params: [number, number, number]) => void;
f1(...tuple1);
f1(...tuple2); // Error
export {}


//// [tupleIntersectionArity.js]
"use strict";
exports.__esModule = true;
f1.apply(void 0, tuple1);
f1.apply(void 0, tuple2); // Error
