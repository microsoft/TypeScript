//// [declFileForTypeParameters.ts]
class C<T> {
    x: T;
    foo(a: T): T {
        return this.x;
    }
}

//// [declFileForTypeParameters.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (a) {
        return this.x;
    };
    return C;
}());


//// [declFileForTypeParameters.d.ts]
declare class C<T> {
    x: T;
    foo(a: T): T;
}
