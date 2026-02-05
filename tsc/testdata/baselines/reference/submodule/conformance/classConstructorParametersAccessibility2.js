//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorParametersAccessibility2.ts] ////

//// [classConstructorParametersAccessibility2.ts]
class C1 {
    constructor(public x?: number) { }
}
declare var c1: C1;
c1.x // OK


class C2 {
    constructor(private p?: number) { }
}
declare var c2: C2;
c2.p // private, error


class C3 {
    constructor(protected p?: number) { }
}
declare var c3: C3;
c3.p // protected, error
class Derived extends C3 {
    constructor(p: number) {
        super(p);
        this.p; // OK
    }
}


//// [classConstructorParametersAccessibility2.js]
"use strict";
class C1 {
    x;
    constructor(x) {
        this.x = x;
    }
}
c1.x; // OK
class C2 {
    p;
    constructor(p) {
        this.p = p;
    }
}
c2.p; // private, error
class C3 {
    p;
    constructor(p) {
        this.p = p;
    }
}
c3.p; // protected, error
class Derived extends C3 {
    constructor(p) {
        super(p);
        this.p; // OK
    }
}
