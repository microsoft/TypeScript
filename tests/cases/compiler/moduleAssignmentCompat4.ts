namespace A {
   export module M {
        class C { }
    }
}
namespace B {
    export module M {
        export class D { }
    }
}

var a: A;
var b: B;

a = b;
b = a; // error