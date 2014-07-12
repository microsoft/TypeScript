//// [typeParametersAreIdenticalToThemselves.js]
// type parameters from the same declaration are identical to themself

function foo1(x) {
}

function foo2(x) {
}

function foo3(x, y) {
    function inner(x) {
    }

    function inner2(x) {
    }
}

var C = (function () {
    function C() {
    }
    C.prototype.foo1 = function (x) {
    };

    C.prototype.foo2 = function (a, x) {
    };

    C.prototype.foo3 = function (x) {
    };

    C.prototype.foo4 = function (x) {
    };
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo1 = function (x) {
    };

    C2.prototype.foo2 = function (a, x) {
    };

    C2.prototype.foo3 = function (x) {
    };
    return C2;
})();
