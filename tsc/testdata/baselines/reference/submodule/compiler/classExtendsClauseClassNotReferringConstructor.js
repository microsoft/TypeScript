//// [tests/cases/compiler/classExtendsClauseClassNotReferringConstructor.ts] ////

//// [classExtendsClauseClassNotReferringConstructor.ts]
class A { a: number; }
module Foo {
    var A = 1;
    class B extends A { b: string; }
}


//// [classExtendsClauseClassNotReferringConstructor.js]
class A {
    a;
}
var Foo;
(function (Foo) {
    var A = 1;
    class B extends A {
        b;
    }
})(Foo || (Foo = {}));
