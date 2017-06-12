//// [wrappedAndRecursiveConstraints.ts]
// no errors expected

class C<T extends Date> {
    constructor(public data: T) { }
    foo<U extends T>(x: U) {
        return x;
    }
}

interface Foo extends Date {
    foo: string;
}

var y: Foo = null;
var c = new C(y);
var r = c.foo(y);

//// [wrappedAndRecursiveConstraints.js]
// no errors expected
var C = (function () {
    function C(data) {
        this.data = data;
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) {
        return x;
    };
    return C;
}());
var y = null;
var c = new C(y);
var r = c.foo(y);
