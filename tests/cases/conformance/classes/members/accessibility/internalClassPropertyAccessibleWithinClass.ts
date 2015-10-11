// @target: ES5
// no errors

class C {
    internal x: string;
    internal get y() { return this.x; }
    internal set y(x) { this.y = this.x; }
    internal foo() { return this.foo; }

    internal static x: string;
    internal static get y() { return this.x; }
    internal static set y(x) { this.y = this.x; }
    internal static foo() { return this.foo; }
    internal static bar() { this.foo(); }
}

// added level of function nesting
class C2 {
    internal x: string;
    internal get y() { () => this.x; return null; }
    internal set y(x) { () => { this.y = this.x; } }
    internal foo() { () => this.foo; }

    internal static x: string;
    internal static get y() { () => this.x; return null; }
    internal static set y(x) {
        () => { this.y = this.x; }
     }
    internal static foo() { () => this.foo; }
    internal static bar() { () => this.foo(); }
}
