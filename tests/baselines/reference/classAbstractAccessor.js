//// [classAbstractAccessor.ts]
abstract class A {
   abstract get a();
   abstract get aa() { return 1; } // error
   abstract set b(x: string);
   abstract set bb(x: string) {} // error
}


//// [classAbstractAccessor.js]
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "aa", {
        get: function () { return 1; } // error
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(A.prototype, "bb", {
        set: function (x) { } // error
        ,
        enumerable: false,
        configurable: true
    });
    return A;
}());
