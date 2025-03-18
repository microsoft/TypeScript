//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorParametersAccessibility3.ts] ////

//// [classConstructorParametersAccessibility3.ts]
class Base {
    constructor(protected p: number) { }
}

class Derived extends Base {
    constructor(public p: number) {
        super(p);
        this.p; // OK
    }
}

var d: Derived;
d.p;  // public, OK

//// [classConstructorParametersAccessibility3.js]
class Base {
    p;
    constructor(p) {
        this.p = p;
    }
}
class Derived extends Base {
    p;
    constructor(p) {
        this.p = p;
        super(p);
        this.p;
    }
}
var d;
d.p;
