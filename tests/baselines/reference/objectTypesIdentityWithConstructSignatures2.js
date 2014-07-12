//// [objectTypesIdentityWithConstructSignatures2.js]
// object types are identical structurally
var B = (function () {
    function B(x) {
        return null;
    }
    return B;
})();

var C = (function () {
    function C(x) {
        return null;
    }
    return C;
})();

var a;
var b = { new: function (x) {
        return '';
    } };

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
