//// [tests/cases/compiler/incrementOnTypeParameter.ts] ////

//// [incrementOnTypeParameter.ts]
class C<T> {
    a: T;
    foo() {
        this.a++; 
        for (var i: T, j = 0; j < 10; i++) { 
        }
    }
}


//// [incrementOnTypeParameter.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        this.a++;
        for (var i, j = 0; j < 10; i++) {
        }
    };
    return C;
}());
