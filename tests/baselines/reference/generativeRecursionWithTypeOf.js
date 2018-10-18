//// [generativeRecursionWithTypeOf.ts]
class C<T> {
    static foo(x: number) { }
    type: T;
}

module M {
    export function f(x: typeof C) {   
        return new x<typeof x>();     
    }
}

//// [generativeRecursionWithTypeOf.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.foo = function (x) { };
    return C;
}());
var M;
(function (M) {
    function f(x) {
        return new x();
    }
    M.f = f;
})(M || (M = {}));
