//// [restParameterWithoutAnnotationIsAnyArray.ts]
// Rest parameters without type annotations are 'any', errors only for the functions with 2 rest params

function foo(...x) { }
var f = function foo(...x) { }
var f2 = (...x, ...y) => { }

class C {
    foo(...x) { }
}

interface I {
    (...x);
    foo(...x, ...y);
}

var a: {
    (...x);
    foo(...x);
}

var b = {
    foo(...x) { },
    a: function foo(...x, ...y) { },
    b: (...x) => { }
}


//// [restParameterWithoutAnnotationIsAnyArray.js]
// Rest parameters without type annotations are 'any', errors only for the functions with 2 rest params
function foo() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
var f = function foo() {
    var x = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        x[_a] = arguments[_a];
    }
};
var f2 = function () {
    var y = [];
    for (var _b = 1; _b < arguments.length; _b++) {
        y[_b - 1] = arguments[_b];
    }
};
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var x = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            x[_c] = arguments[_c];
        }
    };
    return C;
}());
var a;
var b = {
    foo: function () {
        var x = [];
        for (var _d = 0; _d < arguments.length; _d++) {
            x[_d] = arguments[_d];
        }
    },
    a: function foo() {
        var y = [];
        for (var _e = 1; _e < arguments.length; _e++) {
            y[_e - 1] = arguments[_e];
        }
    },
    b: function () {
        var x = [];
        for (var _f = 0; _f < arguments.length; _f++) {
            x[_f] = arguments[_f];
        }
    }
};
