//// [tests/cases/compiler/genericClassesInModule.ts] ////

//// [genericClassesInModule.ts]
module Foo {

    export class B<T>{ }

    export class A { }
}

var a = new Foo.B<Foo.A>();

//// [genericClassesInModule.js]
var Foo;
(function (Foo) {
    class B {
    }
    Foo.B = B;
    class A {
    }
    Foo.A = A;
})(Foo || (Foo = {}));
var a = new Foo.B();
