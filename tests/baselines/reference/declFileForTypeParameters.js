//// [declFileForTypeParameters.ts]
class C<T> {
    x: T;
    foo(a: T): T {
        return this.x;
    }
}

//// [declFileForTypeParameters.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (a) {
        return this.x;
    };
    return C;
}());


//// [declFileForTypeParameters.d.ts]
declare class C<T> {
    x: T;
    foo(a: T): T;
}
