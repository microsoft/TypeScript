//// [tests/cases/compiler/reboundBaseClassSymbol.ts] ////

//// [reboundBaseClassSymbol.ts]
interface A { a: number; }
module Foo {
    var A = 1;
    interface B extends A { b: string; } 
}

//// [reboundBaseClassSymbol.js]
var Foo;
(function (Foo) {
    var A = 1;
})(Foo || (Foo = {}));
