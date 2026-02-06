//// [tests/cases/compiler/innerBoundLambdaEmit.ts] ////

//// [innerBoundLambdaEmit.ts]
namespace M {
    export class Foo {
    }
    var bar = () => { };
}
interface Array<T> {
    toFoo(): M.Foo
}


//// [innerBoundLambdaEmit.js]
"use strict";
var M;
(function (M) {
    class Foo {
    }
    M.Foo = Foo;
    var bar = () => { };
})(M || (M = {}));
