//// [tests/cases/compiler/classSideInheritance3.ts] ////

//// [classSideInheritance3.ts]
class A {
    constructor(public x: string) {
    }
}
class B extends A {
    constructor(x: string, public data: string) {
        super(x);
    }
}
class C extends A {
    constructor(x: string) {
        super(x);
    }
}

var r1: typeof A = B; // error
var r2: new (x: string) => A = B; // error
var r3: typeof A = C; // ok

//// [classSideInheritance3.js]
class A {
    x;
    constructor(x) {
        this.x = x;
    }
}
class B extends A {
    data;
    constructor(x, data) {
        super(x);
        this.data = data;
    }
}
class C extends A {
    constructor(x) {
        super(x);
    }
}
var r1 = B; // error
var r2 = B; // error
var r3 = C; // ok
