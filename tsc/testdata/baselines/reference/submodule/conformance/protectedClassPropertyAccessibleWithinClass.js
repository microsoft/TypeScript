//// [tests/cases/conformance/classes/members/accessibility/protectedClassPropertyAccessibleWithinClass.ts] ////

//// [protectedClassPropertyAccessibleWithinClass.ts]
// no errors

class C {
    protected x: string;
    protected get y() { return this.x; }
    protected set y(x) { this.y = this.x; }
    protected foo() { return this.foo; }

    protected static x: string;
    protected static get y() { return this.x; }
    protected static set y(x) { this.y = this.x; }
    protected static foo() { return this.foo; }
    protected static bar() { this.foo(); }
}

// added level of function nesting
class C2 {
    protected x: string;
    protected get y() { () => this.x; return null; }
    protected set y(x) { () => { this.y = this.x; } }
    protected foo() { () => this.foo; }

    protected static x: string;
    protected static get y() { () => this.x; return null; }
    protected static set y(x) {
        () => { this.y = this.x; }
     }
    protected static foo() { () => this.foo; }
    protected static bar() { () => this.foo(); }
}


//// [protectedClassPropertyAccessibleWithinClass.js]
// no errors
class C {
    x;
    get y() { return this.x; }
    set y(x) { this.y = this.x; }
    foo() { return this.foo; }
    static x;
    static get y() { return this.x; }
    static set y(x) { this.y = this.x; }
    static foo() { return this.foo; }
    static bar() { this.foo(); }
}
// added level of function nesting
class C2 {
    x;
    get y() { () => this.x; return null; }
    set y(x) { () => { this.y = this.x; }; }
    foo() { () => this.foo; }
    static x;
    static get y() { () => this.x; return null; }
    static set y(x) {
        () => { this.y = this.x; };
    }
    static foo() { () => this.foo; }
    static bar() { () => this.foo(); }
}
