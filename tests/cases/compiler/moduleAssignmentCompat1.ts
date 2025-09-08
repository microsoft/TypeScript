namespace A {
    export class C { }
}
namespace B {
    export class C { }
    class D { }
}

var a: A;
var b: B;

// no error
a = b;
b = a;

