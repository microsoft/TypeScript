//// [objectTypesIdentityWithGenericCallSignaturesOptionalParams.js]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required,
// optional or rest) and types, and identical return types.
var A = (function () {
    function A() {
    }
    A.prototype.foo = function (x, y) {
        return null;
    };
    return A;
})();

var B = (function () {
    function B() {
    }
    B.prototype.foo = function (x, y) {
        return null;
    };
    return B;
})();

var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) {
        return null;
    };
    return C;
})();

var a;
var b = { foo: function (x, y) {
        return x;
    } };

function foo1(x) {
}

function foo1b(x) {
}

function foo1c(x) {
}

function foo2(x) {
}

function foo3(x) {
}

function foo4(x) {
}

function foo5(x) {
}

function foo5b(x) {
}

function foo6(x) {
}

function foo7(x) {
}

function foo8(x) {
}

function foo9(x) {
}

function foo10(x) {
}

function foo11(x) {
}

function foo12(x) {
}

function foo12b(x) {
}

function foo13(x) {
}

function foo14(x) {
}

function foo15(x) {
}
