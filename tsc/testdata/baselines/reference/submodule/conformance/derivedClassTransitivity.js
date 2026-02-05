//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassTransitivity.ts] ////

//// [derivedClassTransitivity.ts]
// subclassing is not transitive when you can remove required parameters and add optional parameters

class C {
    foo(x: number) { }
}

class D extends C {
    foo() { } // ok to drop parameters
}

class E extends D {
    foo(x?: string) { } // ok to add optional parameters
}

declare var c: C;
declare var d: D;
declare var e: E;
c = e;
var r = c.foo(1);
var r2 = e.foo('');

//// [derivedClassTransitivity.js]
"use strict";
// subclassing is not transitive when you can remove required parameters and add optional parameters
class C {
    foo(x) { }
}
class D extends C {
    foo() { } // ok to drop parameters
}
class E extends D {
    foo(x) { } // ok to add optional parameters
}
c = e;
var r = c.foo(1);
var r2 = e.foo('');
