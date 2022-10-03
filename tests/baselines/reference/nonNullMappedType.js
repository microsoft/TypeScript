//// [nonNullMappedType.ts]
function f<A extends string>(p0: { [key in A]: {} | undefined }, p1: A) {
    const v: {} = p0[p1]!;
}

//// [nonNullMappedType.js]
"use strict";
function f(p0, p1) {
    var v = p0[p1];
}
