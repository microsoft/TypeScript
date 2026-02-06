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
}
var Foo;
(function (Foo) {
    var A = 1;
    class B extends A {
    }
})(Foo || (Foo = {}));
