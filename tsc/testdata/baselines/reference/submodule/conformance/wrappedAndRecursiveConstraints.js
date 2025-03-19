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

var y: Foo = null;
var c = new C(y);
var r = c.foo(y);

//// [wrappedAndRecursiveConstraints.js]
// no errors expected
class C {
    data;
    constructor(data) {
        this.data = data;
    }
    foo(x) {
        return x;
    }
}
var y = null;
var c = new C(y);
var r = c.foo(y);
