//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedGenericClassWithAny.ts] ////

//// [derivedGenericClassWithAny.ts]
class C<T extends number> {
    x: T;
    get X(): T { return null; }
    foo(): T {
        return null;
    }
}

class D extends C<number> {
    x: any;
    get X(): any {
        return null;
    }
    foo(): any {
        return 1;
    }

    static y: any;
    static get Y(): any {
        return null;
    }
    static bar(): any {
        return null;
    }
}

// if D is a valid class definition than E is now not safe tranisitively through C
class E<T extends string> extends D {
    x: T;
    get X(): T { return ''; } // error
    foo(): T {
        return ''; // error
    }
}

declare var c: C<number>;
declare var d: D;
declare var e: E<string>;

c = d;
c = e;
var r = c.foo(); // e.foo would return string

//// [derivedGenericClassWithAny.js]
"use strict";
class C {
    x;
    get X() { return null; }
    foo() {
        return null;
    }
}
class D extends C {
    x;
    get X() {
        return null;
    }
    foo() {
        return 1;
    }
    static y;
    static get Y() {
        return null;
    }
    static bar() {
        return null;
    }
}
// if D is a valid class definition than E is now not safe tranisitively through C
class E extends D {
    x;
    get X() { return ''; } // error
    foo() {
        return ''; // error
    }
}
c = d;
c = e;
var r = c.foo(); // e.foo would return string
