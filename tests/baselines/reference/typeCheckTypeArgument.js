//// [typeCheckTypeArgument.js]
/// <reference no-default-lib="true"/>
var f;

var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

function bar() {
}

var Foo2 = (function () {
    function Foo2() {
    }
    Foo2.prototype.method = function () {
    };
    return Foo2;
})();

(function (a) {
});
