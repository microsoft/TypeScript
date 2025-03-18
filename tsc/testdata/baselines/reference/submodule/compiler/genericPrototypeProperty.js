//// [tests/cases/compiler/genericPrototypeProperty.ts] ////

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
class C {
    x;
    foo(x) { return null; }
}
var r = C.prototype;
var r2 = r.x;
var r3 = r.foo(null);
