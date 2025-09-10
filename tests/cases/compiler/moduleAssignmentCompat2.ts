namespace A {
    export class C { }
}
namespace B {
    export class C { }
    export class D { }
}

var a: A;
var b: B;

a = b;
b = a; // error