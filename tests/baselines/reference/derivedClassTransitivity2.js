//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassTransitivity2.ts] ////

//// [derivedClassTransitivity2.ts]
// subclassing is not transitive when you can remove required parameters and add optional parameters

class C {
    foo(x: number, y: number) { }
}

class D extends C {
    foo(x: number) { } // ok to drop parameters
}

class E extends D {
    foo(x: number, y?: string) { } // ok to add optional parameters
}

declare var c: C;
declare var d: D;
declare var e: E;
c = e;
var r = c.foo(1, 1);
var r2 = e.foo(1, '');

//// [derivedClassTransitivity2.js]
"use strict";
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
c = e;
var r = c.foo(1, 1);
var r2 = e.foo(1, '');
