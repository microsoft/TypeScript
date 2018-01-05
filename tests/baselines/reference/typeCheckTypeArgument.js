//// [typeCheckTypeArgument.ts]
var f: <T extends UNKNOWN>() => void;

interface IFoo<T extends UNKNOWN> { }

class Foo<T extends UNKNOWN> { }

function bar<T extends UNKNOWN>() { }

class Foo2 {
    method<T extends UNKNOWN>() { }
}

(<T extends UNKNOWN>(a) => { });

//// [typeCheckTypeArgument.js]
var f;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
function bar() { }
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    Foo2.prototype.method = function () { };
    return Foo2;
}());
(function (a) { });
