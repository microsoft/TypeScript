//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassTransitivity3.ts] ////

//// [derivedClassTransitivity3.ts]
// subclassing is not transitive when you can remove required parameters and add optional parameters

class C<T> {
    foo(x: T, y: T) { }
}

class D<T> extends C<T> {
    foo(x: T) { } // ok to drop parameters
}

class E<T> extends D<T> {
    foo(x: T, y?: number) { } // ok to add optional parameters
}

var c: C<string>;
var d: D<string>;
var e: E<string>;
c = e;
var r = c.foo('', '');
var r2 = e.foo('', 1);

//// [derivedClassTransitivity3.js]
// subclassing is not transitive when you can remove required parameters and add optional parameters
class C {
    foo(x, y) { }
}
class D extends C {
    foo(x) { } // ok to drop parameters
}
class E extends D {
    foo(x, y) { } // ok to add optional parameters
}
var c;
var d;
var e;
c = e;
var r = c.foo('', '');
var r2 = e.foo('', 1);
