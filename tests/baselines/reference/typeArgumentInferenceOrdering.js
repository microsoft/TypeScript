//// [tests/cases/compiler/typeArgumentInferenceOrdering.ts] ////

//// [typeArgumentInferenceOrdering.ts]
class C {
    y: I;
}

interface I {
    x(): Goo;
}

interface Goo {
    p: string;
}

function foo<T>(f: { y: T }): T { return null }
var x = foo(new C()).x; // was Error that property x does not exist on type {}

//// [typeArgumentInferenceOrdering.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
function foo(f) { return null; }
var x = foo(new C()).x; // was Error that property x does not exist on type {}
