//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassWithPrivateInstanceShadowingPublicInstance.ts] ////

//// [derivedClassWithPrivateInstanceShadowingPublicInstance.ts]
class Base {
    public x: string;
    public fn(): string {
        return '';
    }

    public get a() { return 1; }
    public set a(v) { }
}

// error, not a subtype
class Derived extends Base {
    private x: string; 
    private fn(): string {
        return '';
    }

    private get a() { return 1; }
    private set a(v) { }
}

var r = Base.x; // ok
var r2 = Derived.x; // error

var r3 = Base.fn(); // ok
var r4 = Derived.fn(); // error

var r5 = Base.a; // ok
Base.a = 2; // ok

var r6 = Derived.a; // error
Derived.a = 2; // error

//// [derivedClassWithPrivateInstanceShadowingPublicInstance.js]
class Base {
    x;
    fn() {
        return '';
    }
    get a() { return 1; }
    set a(v) { }
}
// error, not a subtype
class Derived extends Base {
    x;
    fn() {
        return '';
    }
    get a() { return 1; }
    set a(v) { }
}
var r = Base.x; // ok
var r2 = Derived.x; // error
var r3 = Base.fn(); // ok
var r4 = Derived.fn(); // error
var r5 = Base.a; // ok
Base.a = 2; // ok
var r6 = Derived.a; // error
Derived.a = 2; // error
