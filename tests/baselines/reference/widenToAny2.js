//// [tests/cases/compiler/widenToAny2.ts] ////

//// [widenToAny2.ts]
function foo3<T>(x: T[]): T {
    return undefined;
}
var z3:number = foo3([undefined, "def"]);  // Type is any, but should be string


//// [widenToAny2.js]
function foo3(x) {
    return undefined;
}
var z3 = foo3([undefined, "def"]); // Type is any, but should be string
