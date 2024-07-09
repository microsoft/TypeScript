// @target: ES5
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
