//// [callSignaturesWithDuplicateParameters.js]
// Duplicate parameter names are always an error
function foo(x, x) {
}
var f = function foo(x, x) {
};
var f2 = function (x, x) {
};
var f3 = function (x, x) {
};
var f4 = function (x, x) {
};

function foo2(x, x) {
}
var f5 = function foo(x, x) {
};
var f6 = function (x, x) {
};
var f7 = function (x, x) {
};
var f8 = function (x, y) {
};

var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x, x) {
    };
    C.prototype.foo2 = function (x, x) {
    };
    C.prototype.foo3 = function (x, x) {
    };
    return C;
})();

var a;

var b = {
    foo: function (x, x) {
    },
    a: function foo(x, x) {
    },
    b: function (x, x) {
    }
};
