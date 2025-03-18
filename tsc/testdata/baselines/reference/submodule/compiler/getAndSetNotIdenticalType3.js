//// [tests/cases/compiler/getAndSetNotIdenticalType3.ts] ////

//// [getAndSetNotIdenticalType3.ts]
class A<T> { foo: T; }

class C<T> {
    data: A<number>;
    get x(): A<number> {
        return this.data;
    }
    set x(v: A<string>) {
        this.data = v;
    }
}

var x = new C();
var r = x.x;
x.x = r;

//// [getAndSetNotIdenticalType3.js]
class A {
    foo;
}
class C {
    data;
    get x() {
        return this.data;
    }
    set x(v) {
        this.data = v;
    }
}
var x = new C();
var r = x.x;
x.x = r;
