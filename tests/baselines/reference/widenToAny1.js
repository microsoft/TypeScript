//// [tests/cases/compiler/widenToAny1.ts] ////

//// [widenToAny1.ts]
function foo1<T>(f1: { x: T; y: T }): T {
    return undefined;
}
var z1: number = foo1({ x: undefined, y: "def" });  // Best common type is any


//// [widenToAny1.js]
function foo1(f1) {
    return undefined;
}
var z1 = foo1({ x: undefined, y: "def" }); // Best common type is any
