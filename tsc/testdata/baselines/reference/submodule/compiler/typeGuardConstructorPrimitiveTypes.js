//// [tests/cases/compiler/typeGuardConstructorPrimitiveTypes.ts] ////

//// [typeGuardConstructorPrimitiveTypes.ts]
// Narrow a union of primitive types
let var1: string | number | boolean | any[] | symbol | bigint;
if (var1.constructor === String) {
    var1; // string
}
if (var1.constructor === Number) {
    var1; // number
}
if (var1.constructor === Boolean) {
    var1; // boolean
}
if (var1.constructor === Array) {
    var1; // any[]
}
if (var1.constructor === Symbol) {
    var1; // symbol
}
if (var1.constructor === BigInt) {
    var1; // bigint
}

// Narrow a union of primitive object types
let var2: String | Number | Boolean | Symbol | BigInt;
if (var2.constructor === String) {
    var2; // String
}
if (var2.constructor === Number) {
    var2; // Number
}
if (var2.constructor === Boolean) {
    var2; // Boolean
}
if (var2.constructor === Symbol) {
    var2; // Symbol
}
if (var2.constructor === BigInt) {
    var2; // BigInt
}


//// [typeGuardConstructorPrimitiveTypes.js]
// Narrow a union of primitive types
let var1;
if (var1.constructor === String) {
    var1; // string
}
if (var1.constructor === Number) {
    var1; // number
}
if (var1.constructor === Boolean) {
    var1; // boolean
}
if (var1.constructor === Array) {
    var1; // any[]
}
if (var1.constructor === Symbol) {
    var1; // symbol
}
if (var1.constructor === BigInt) {
    var1; // bigint
}
// Narrow a union of primitive object types
let var2;
if (var2.constructor === String) {
    var2; // String
}
if (var2.constructor === Number) {
    var2; // Number
}
if (var2.constructor === Boolean) {
    var2; // Boolean
}
if (var2.constructor === Symbol) {
    var2; // Symbol
}
if (var2.constructor === BigInt) {
    var2; // BigInt
}
