//// [tests/cases/conformance/es6/Symbols/symbolProperty28.ts] ////

//// [symbolProperty28.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

class C2 extends C1 { }

var c: C2;
var obj = c[Symbol.toStringTag]().x;

//// [symbolProperty28.js]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 extends C1 {
}
var c;
var obj = c[Symbol.toStringTag]().x;
