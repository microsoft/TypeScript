//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorParametersAccessibility.ts] ////

//// [classConstructorParametersAccessibility.ts]
class C1 {
    constructor(public x: number) { }
}
var c1: C1;
c1.x // OK


class C2 {
    constructor(private p: number) { }
}
var c2: C2;
c2.p // private, error


class C3 {
    constructor(protected p: number) { }
}
var c3: C3;
c3.p // protected, error
class Derived extends C3 {
    constructor(p: number) {
        super(p);
        this.p; // OK
    }
}


//// [classConstructorParametersAccessibility.js]
class C1 {
    x;
    constructor(x) {
        this.x = x;
    }
}
var c1;
c1.x;
class C2 {
    p;
    constructor(p) {
        this.p = p;
    }
}
var c2;
c2.p;
class C3 {
    p;
    constructor(p) {
        this.p = p;
    }
}
var c3;
c3.p;
class Derived extends C3 {
    constructor(p) {
        super(p);
        this.p;
    }
}
