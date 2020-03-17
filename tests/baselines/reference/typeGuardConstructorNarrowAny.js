//// [typeGuardConstructorNarrowAny.ts]
// Narrowing any to primitives
let var1: any;

if (var1.constructor === String) {
    var1; // String
}
if (var1.constructor === Number) {
    var1; // Number
}
if (var1.constructor === Boolean) {
    var1; // Boolean
}
if (var1.constructor === Array) {
    var1; // any[]
}
if (var1.constructor === Symbol) {
    var1; // Symbol
}
if (var1.constructor === BigInt) {
    var1; // BigInt
}


//// [typeGuardConstructorNarrowAny.js]
// Narrowing any to primitives
let var1;
if (var1.constructor === String) {
    var1; // String
}
if (var1.constructor === Number) {
    var1; // Number
}
if (var1.constructor === Boolean) {
    var1; // Boolean
}
if (var1.constructor === Array) {
    var1; // any[]
}
if (var1.constructor === Symbol) {
    var1; // Symbol
}
if (var1.constructor === BigInt) {
    var1; // BigInt
}
