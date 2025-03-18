//// [tests/cases/compiler/classExtendsClauseClassMergedWithModuleNotReferingConstructor.ts] ////

//// [classExtendsClauseClassMergedWithModuleNotReferingConstructor.ts]
class A {
    a: number;
}
module A {
    export var v: string;
}

module Foo {
    var A = 1;
    class B extends A {
        b: string;
    }
}

//// [classExtendsClauseClassMergedWithModuleNotReferingConstructor.js]
class A {
    a;
}
(function (A) {
})(A || (A = {}));
var Foo;
(function (Foo) {
    var A = 1;
    class B extends A {
        b;
    }
})(Foo || (Foo = {}));
