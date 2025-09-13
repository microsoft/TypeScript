// expected no error

namespace B {
    export import a = A;
    export class D extends a.C {
        id: number;
    }
}

namespace A {
    export class C { name: string }
    export import b = B;
}

var c: { name: string };
var c = new B.a.C();


