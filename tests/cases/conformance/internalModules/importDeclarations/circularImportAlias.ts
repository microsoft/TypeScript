// expected no error

module B {
    export import a = A;
    export class D extends a.C {
        id: number;
    }
}

module A {
    export class C { name: string }
    export import b = B;
}

var c: { name: string };
var c = new B.a.C();


