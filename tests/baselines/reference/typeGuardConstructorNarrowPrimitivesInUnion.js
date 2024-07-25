//// [tests/cases/compiler/typeGuardConstructorNarrowPrimitivesInUnion.ts] ////

//// [typeGuardConstructorNarrowPrimitivesInUnion.ts]
// Union of primitives, number, arrays, and C1
let var1: number | "hello" | "world" | true | false | number[] | string[];

if (var1.constructor === Number) {
    var1; // number
}

if (var1.constructor === String) {
    var1; // "hello" | "world"
}

if (var1.constructor === Boolean) {
    var1; // boolean
}

if (var1.constructor === Array) {
    var1; // number[] | string[]
}


//// [typeGuardConstructorNarrowPrimitivesInUnion.js]
// Union of primitives, number, arrays, and C1
var var1;
if (var1.constructor === Number) {
    var1; // number
}
if (var1.constructor === String) {
    var1; // "hello" | "world"
}
if (var1.constructor === Boolean) {
    var1; // boolean
}
if (var1.constructor === Array) {
    var1; // number[] | string[]
}
