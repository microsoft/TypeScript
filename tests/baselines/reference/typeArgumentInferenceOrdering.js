//// [typeArgumentInferenceOrdering.ts]
function foo<T>(f: { y: T }): T { return null }
var x = foo(new C()).x; // was Error that property x does not exist on type {}

class C {
    y: I;
}

interface I {
    x(): Goo;
}

interface Goo {
    p: string;
}


//// [typeArgumentInferenceOrdering.js]
function foo(f) {
    return null;
}
var x = foo(new C()).x;

var C = (function () {
    function C() {
    }
    return C;
})();
