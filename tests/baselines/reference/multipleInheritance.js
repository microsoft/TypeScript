//// [tests/cases/compiler/multipleInheritance.ts] ////

//// [multipleInheritance.ts]
class B1 {
    public x;
}

class B2 {
    public x;
}

class C extends B1, B2 { // duplicate member
}

class D1 extends B1 {
}

class D2 extends B2 {
}

class E extends D1, D2 { // nope, duplicate member
}

class N {
    public y:number;
}

class ND extends N { // any is assignable to number
    public y;
}

class Good {
    public f:() => number = function() { return 0; }
    public g() { return 0; }
}

class Baad extends Good {
    public f(): number { return 0; }
    public g(n:number) { return 0; }
}


//// [multipleInheritance.js]
class B1 {
}
class B2 {
}
class C extends B1, B2 {
}
class D1 extends B1 {
}
class D2 extends B2 {
}
class E extends D1, D2 {
}
class N {
}
class ND extends N {
}
class Good {
    constructor() {
        this.f = function () { return 0; };
    }
    g() { return 0; }
}
class Baad extends Good {
    f() { return 0; }
    g(n) { return 0; }
}
