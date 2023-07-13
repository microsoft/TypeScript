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
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    Foo.B = B;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    Foo.A = A;
})(Foo || (Foo = {}));
var a = new Foo.B();


//// [genericClassesInModule.d.ts]
declare namespace Foo {
    class B<T> {
    }
    class A {
    }
}
declare var a: Foo.B<Foo.A>;
