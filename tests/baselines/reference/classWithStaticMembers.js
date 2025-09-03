//// [tests/cases/conformance/classes/members/constructorFunctionTypes/classWithStaticMembers.ts] ////

//// [classWithStaticMembers.ts]
class C {
    static fn() { return this; }
    static get x() { return 1; }
    static set x(v) { }
    constructor(public a: number, private b: number) { }
    static foo: string; 
}

var r = C.fn();
var r2 = r.x;
var r3 = r.foo;

class D extends C {
    bar: string;
}

var r = D.fn();
var r2 = r.x;
var r3 = r.foo;

//// [classWithStaticMembers.js]
class C {
    a;
    b;
    static fn() { return this; }
    static get x() { return 1; }
    static set x(v) { }
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    static foo;
}
var r = C.fn();
var r2 = r.x;
var r3 = r.foo;
class D extends C {
    bar;
}
var r = D.fn();
var r2 = r.x;
var r3 = r.foo;
