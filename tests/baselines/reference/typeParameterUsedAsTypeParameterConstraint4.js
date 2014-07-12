//// [typeParameterUsedAsTypeParameterConstraint4.js]
// Type parameters are in scope in their own and other type parameter lists
// Some negative cases
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        var r;
        return x;
    };
    return C;
})();

function foo(x, y) {
    function bar() {
        function baz(a, b) {
            x = y;
            return y;
        }
    }
}

function foo2(x, y) {
    function bar() {
        function baz(a, b) {
            x = y;
            return y;
        }
    }
}

var f3 = function (x, y) {
    function bar(r, s) {
        var g = function (a, b) {
            x = y;
            return y;
        };
    }
};

var f4 = function (x, y) {
    function bar() {
        var g = function (a, b) {
            x = y;
            return y;
        };
    }
};
