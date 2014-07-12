//// [genericSpecializations3.js]
var iFoo;
iFoo.foo(1);

var IntFooBad = (function () {
    function IntFooBad() {
    }
    IntFooBad.prototype.foo = function (x) {
        return null;
    };
    return IntFooBad;
})();

var intFooBad;

var IntFoo = (function () {
    function IntFoo() {
    }
    IntFoo.prototype.foo = function (x) {
        return null;
    };
    return IntFoo;
})();

var intFoo;

var StringFoo2 = (function () {
    function StringFoo2() {
    }
    StringFoo2.prototype.foo = function (x) {
        return null;
    };
    return StringFoo2;
})();

var stringFoo2;
stringFoo2.foo("hm");

intFoo = stringFoo2; // error
stringFoo2 = intFoo; // error

var StringFoo3 = (function () {
    function StringFoo3() {
    }
    StringFoo3.prototype.foo = function (x) {
        return null;
    };
    return StringFoo3;
})();
var stringFoo3;
