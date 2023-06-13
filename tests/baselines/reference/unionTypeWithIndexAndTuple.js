//// [tests/cases/compiler/unionTypeWithIndexAndTuple.ts] ////

//// [unionTypeWithIndexAndTuple.ts]
interface I {
    [index: number]: any;
    someOtherProperty: number;
}
function f(args: ["a"] | I) { }
f(["a"]);

//// [unionTypeWithIndexAndTuple.js]
function f(args) { }
f(["a"]);
