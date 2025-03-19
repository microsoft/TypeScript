//// [tests/cases/conformance/classes/members/accessibility/protectedClassPropertyAccessibleWithinSubclass.ts] ////

//// [protectedClassPropertyAccessibleWithinSubclass.ts]
// no errors

class B {
    protected x: string;
    protected static x: string;
}

class C extends B {
    protected get y() { return this.x; }
    protected set y(x) { this.y = this.x; }
    protected foo() { return this.x; }
    protected bar() { return this.foo(); }

    protected static get y() { return this.x; }
    protected static set y(x) { this.y = this.x; }
    protected static foo() { return this.x; }
    protected static bar() { this.foo(); }
}


//// [protectedClassPropertyAccessibleWithinSubclass.js]
// no errors
class B {
    x;
    static x;
}
class C extends B {
    get y() { return this.x; }
    set y(x) { this.y = this.x; }
    foo() { return this.x; }
    bar() { return this.foo(); }
    static get y() { return this.x; }
    static set y(x) { this.y = this.x; }
    static foo() { return this.x; }
    static bar() { this.foo(); }
}
