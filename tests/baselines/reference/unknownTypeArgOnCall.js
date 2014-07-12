//// [unknownTypeArgOnCall.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.clone = function () {
        return null;
    };
    return Foo;
})();
var f = new Foo();
var r = f.clone();
