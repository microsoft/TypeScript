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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) { return null; };
    return C;
}());
var r = C.prototype;
// should be any
var r2 = r.x;
var r3 = r.foo(null);
