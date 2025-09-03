//// [tests/cases/conformance/classes/members/accessibility/privateClassPropertyAccessibleWithinClass.ts] ////

//// [privateClassPropertyAccessibleWithinClass.ts]
// no errors

class C {
    private x: string;
    private get y() { return this.x; }
    private set y(x) { this.y = this.x; }
    private foo() { return this.foo; }

    private static x: string;
    private static get y() { return this.x; }
    private static set y(x) { this.y = this.x; }
    private static foo() { return this.foo; }
    private static bar() { this.foo(); }
}

// added level of function nesting
class C2 {
    private x: string;
    private get y() { () => this.x; return null; }
    private set y(x) { () => { this.y = this.x; } }
    private foo() { () => this.foo; }

    private static x: string;
    private static get y() { () => this.x; return null; }
    private static set y(x) {
        () => { this.y = this.x; }
     }
    private static foo() { () => this.foo; }
    private static bar() { () => this.foo(); }
}


//// [privateClassPropertyAccessibleWithinClass.js]
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
