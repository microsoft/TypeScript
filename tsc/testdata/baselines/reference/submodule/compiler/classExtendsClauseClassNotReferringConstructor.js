//// [tests/cases/compiler/classExtendsClauseClassNotReferringConstructor.ts] ////

//// [classExtendsClauseClassNotReferringConstructor.ts]
class A { a: number; }
namespace Foo {
    var A = 1;
    class B extends A { b: string; }
}


//// [classExtendsClauseClassNotReferringConstructor.js]
"use strict";
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
