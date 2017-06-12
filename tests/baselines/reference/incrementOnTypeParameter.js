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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        this.a++;
        for (var i, j = 0; j < 10; i++) {
        }
    };
    return C;
}());
