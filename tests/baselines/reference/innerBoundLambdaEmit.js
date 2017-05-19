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
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    M.Foo = Foo;
    var bar = function () { };
})(M || (M = {}));
