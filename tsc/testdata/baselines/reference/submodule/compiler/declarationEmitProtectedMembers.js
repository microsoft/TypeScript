//// [tests/cases/compiler/declarationEmitProtectedMembers.ts] ////

//// [declarationEmitProtectedMembers.ts]
// Class with protected members
class C1 {
    protected x: number;

    protected f() {
        return this.x;
    }

    protected set accessor(a: number) { }
    protected get accessor() { return 0; }

    protected static sx: number;

    protected static sf() {
        return this.sx;
    }

    protected static set staticSetter(a: number) { }
    protected static get staticGetter() { return 0; }
}

// Derived class overriding protected members
class C2 extends C1 {
    protected f() {
        return super.f() + this.x;
    }
    protected static sf() {
        return super.sf() + this.sx;
    }
}

// Derived class making protected members public
class C3 extends C2 {
    x: number;
    static sx: number;
    f() {
        return super.f();
    }
    static sf() {
        return super.sf();
    }

    static get staticGetter() { return 1; }
}

// Protected properties in constructors
class C4 {
    constructor(protected a: number, protected b) { }
}

//// [declarationEmitProtectedMembers.js]
class C1 {
    x;
    f() {
        return this.x;
    }
    set accessor(a) { }
    get accessor() { return 0; }
    static sx;
    static sf() {
        return this.sx;
    }
    static set staticSetter(a) { }
    static get staticGetter() { return 0; }
}
class C2 extends C1 {
    f() {
        return super.f() + this.x;
    }
    static sf() {
        return super.sf() + this.sx;
    }
}
class C3 extends C2 {
    x;
    static sx;
    f() {
        return super.f();
    }
    static sf() {
        return super.sf();
    }
    static get staticGetter() { return 1; }
}
class C4 {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}
