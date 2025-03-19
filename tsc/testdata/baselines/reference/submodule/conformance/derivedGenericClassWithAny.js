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

var c: C<number>;
var d: D;
var e: E<string>;

c = d;
c = e;
var r = c.foo(); // e.foo would return string

//// [derivedGenericClassWithAny.js]
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
var c;
var d;
var e;
c = d;
c = e;
var r = c.foo(); // e.foo would return string
