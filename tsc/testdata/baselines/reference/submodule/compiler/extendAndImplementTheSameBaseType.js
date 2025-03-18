//// [tests/cases/compiler/extendAndImplementTheSameBaseType.ts] ////

//// [extendAndImplementTheSameBaseType.ts]
class C {
    foo: number
    bar() {}
}
class D extends C implements C {
    baz() { }
}

var c: C;
var d: D = new D();
d.bar();
d.baz();
d.foo;

//// [extendAndImplementTheSameBaseType.js]
class C {
    foo;
    bar() { }
}
class D extends C {
    baz() { }
}
var c;
var d = new D();
d.bar();
d.baz();
d.foo;
