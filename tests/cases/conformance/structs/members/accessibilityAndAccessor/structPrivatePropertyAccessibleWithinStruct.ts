// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration
// no errors

struct C {
    private x: string;
    private foo() { return this.foo; }

    private static x: string;
    private static foo() { return this.foo; }
    private static bar() { this.foo(); }
}

// added level of function nesting
struct C2 {
    private x: string;
    private foo() { () => this.foo; }

    private static x: string;
    private static foo() { () => this.foo; }
    private static bar() { () => this.foo(); }
}
