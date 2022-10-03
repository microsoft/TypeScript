//// [genericPrototypeProperty.ts]
class C<T> {
    x: T;
    foo(x: T): T { return null; }
}

var r = C.prototype;
// should be any
var r2 = r.x
var r3 = r.foo(null);

//// [genericPrototypeProperty.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) { return null; };
    return C;
}());
var r = C.prototype;
// should be any
var r2 = r.x;
var r3 = r.foo(null);
