//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassWithPrivateInstanceShadowingProtectedInstance.ts] ////

//// [derivedClassWithPrivateInstanceShadowingProtectedInstance.ts]
class Base {
    protected x: string;
    protected fn(): string {
        return '';
    }

    protected get a() { return 1; }
    protected set a(v) { }
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


//// [derivedClassWithPrivateInstanceShadowingProtectedInstance.js]
class Base {
    x;
    fn() {
        return '';
    }
    get a() { return 1; }
    set a(v) { }
}
class Derived extends Base {
    x;
    fn() {
        return '';
    }
    get a() { return 1; }
    set a(v) { }
}
