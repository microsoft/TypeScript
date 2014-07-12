//// [errorSupression1.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.bar = function () {
        return "x";
    };
    return Foo;
})();

var baz = Foo.b;

// Foo.b won't bind.
baz.concat("y");
// So we don't want an error on 'concat'.
