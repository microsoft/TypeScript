//// [restParametersOfNonArrayTypes.ts]
// Rest parameters must be an array type if they have a type annotation, so all these are errors

function foo(...x: string) { }
var f = function foo(...x: number) { }
var f2 = (...x: Date, ...y: boolean) => { }

class C {
    foo(...x: C) { }
}

interface I {
    (...x: string);
    foo(...x: number, ...y: number);
}

var a: {
    (...x: string);
    foo(...x: string);
}

var b = {
    foo(...x: string) { },
    a: function foo(...x: number, ...y: Date) { },
    b: (...x: string) => { }
}

//// [restParametersOfNonArrayTypes.js]
// Rest parameters must be an array type if they have a type annotation, so all these are errors
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
