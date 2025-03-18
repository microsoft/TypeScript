//// [tests/cases/compiler/innerBoundLambdaEmit.ts] ////

//// [innerBoundLambdaEmit.ts]
module M {
    export class Foo {
    }
    var bar = () => { };
}
interface Array<T> {
    toFoo(): M.Foo
}


//// [innerBoundLambdaEmit.js]
var M;
(function (M) {
    class Foo {
    }
    M.Foo = Foo;
    var bar = () => { };
})(M || (M = {}));
