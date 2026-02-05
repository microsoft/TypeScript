//// [tests/cases/compiler/classExtendsClauseClassMergedWithModuleNotReferingConstructor.ts] ////

//// [classExtendsClauseClassMergedWithModuleNotReferingConstructor.ts]
class A {
    a: number;
}
namespace A {
    export var v: string;
}

namespace Foo {
    var A = 1;
    class B extends A {
        b: string;
    }
}

//// [classExtendsClauseClassMergedWithModuleNotReferingConstructor.js]
"use strict";
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
