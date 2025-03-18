//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassTransitivity4.ts] ////

//// [derivedClassTransitivity4.ts]
// subclassing is not transitive when you can remove required parameters and add optional parameters on protected members

class C {
    protected foo(x: number) { }
}

class D extends C {
    protected foo() { } // ok to drop parameters
}

class E extends D {
    public foo(x?: string) { } // ok to add optional parameters
}

var c: C;
var d: D;
var e: E;
c = e;
var r = c.foo(1);
var r2 = e.foo('');

//// [derivedClassTransitivity4.js]
class C {
    foo(x) { }
}
class D extends C {
    foo() { }
}
class E extends D {
    foo(x) { }
}
var c;
var d;
var e;
c = e;
var r = c.foo(1);
var r2 = e.foo('');
