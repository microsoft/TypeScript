//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/wrappedAndRecursiveConstraints.ts] ////

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

var y: Foo = {} as Foo;
var c = new C(y);
var r = c.foo(y);

//// [wrappedAndRecursiveConstraints.js]
// no errors expected
var C = /** @class */ (function () {
    function C(data) {
        this.data = data;
    }
    C.prototype.foo = function (x) {
        return x;
    };
    return C;
}());
var y = {};
var c = new C(y);
var r = c.foo(y);
