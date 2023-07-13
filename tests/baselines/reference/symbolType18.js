//// [tests/cases/conformance/es6/Symbols/symbolType18.ts] ////

//// [symbolType18.ts]
interface Foo { prop }
var x: symbol | Foo;

x;
if (typeof x === "object") {
    x;
}
else {
    x;
}

//// [symbolType18.js]
var x;
x;
if (typeof x === "object") {
    x;
}
else {
    x;
}
