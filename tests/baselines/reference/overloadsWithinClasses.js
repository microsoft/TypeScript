//// [overloadsWithinClasses.js]
var foo = (function () {
    function foo() {
    }
    foo.fnOverload = function () {
    };

    foo.fnOverload = function (foo) {
    };
    return foo;
})();

var bar = (function () {
    function bar() {
    }
    bar.fnOverload = function (foo) {
    };
    return bar;
})();

var X = (function () {
    function X() {
    }
    X.prototype.attr = function (first, second) {
    };
    return X;
})();
