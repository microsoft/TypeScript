// @declaration: true
// @target: es5

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