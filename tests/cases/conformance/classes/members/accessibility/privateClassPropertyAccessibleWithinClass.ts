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
