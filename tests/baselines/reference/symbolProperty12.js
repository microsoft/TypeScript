//// [tests/cases/conformance/es6/Symbols/symbolProperty12.ts] ////

//// [symbolProperty12.ts]
class C {
    private [Symbol.iterator]: { x };
}
interface I {
    [Symbol.iterator]: { x };
}

var i: I;
i = new C;
var c: C = i;

//// [symbolProperty12.js]
class C {
}
Symbol.iterator;
var i;
i = new C;
var c = i;
