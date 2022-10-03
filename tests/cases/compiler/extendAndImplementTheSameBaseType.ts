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