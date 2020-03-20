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
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
};
var f2 = function () {
    var y = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        y[_i - 1] = arguments[_i];
    }
};
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    };
    return C;
}());
var a;
var b = {
    foo: function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    },
    a: function foo() {
        var y = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            y[_i - 1] = arguments[_i];
        }
    },
    b: function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    }
};
