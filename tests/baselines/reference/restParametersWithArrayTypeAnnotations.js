//// [restParametersWithArrayTypeAnnotations.ts]
// Rest parameters must be an array type if they have a type annotation, errors only for the functions with 2 rest params

function foo(...x: number[]) { }
var f = function foo(...x: number[]) { }
var f2 = (...x: number[], ...y: number[]) => { }

class C {
    foo(...x: number[]) { }
}

interface I {
    (...x: number[]);
    foo(...x: number[], ...y: number[]);
}

var a: {
    (...x: number[]);
    foo(...x: number[]);
}

var b = {
    foo(...x: number[]) { },
    a: function foo(...x: number[], ...y: number[]) { },
    b: (...x: number[]) => { }
}




function foo2(...x: Array<string>) { }
var f3 = function foo(...x: Array<string>) { }
var f4 = (...x: Array<string>, ...y: Array<string>) => { }

class C2 {
    foo(...x: Array<string>) { }
}

interface I2 {
    (...x: Array<string>);
    foo(...x: Array<string>, ...y: Array<string>);
}

var a2: {
    (...x: Array<string>);
    foo(...x: Array<string>);
}

var b2 = {
    foo(...x: Array<string>) { },
    a: function foo(...x: Array<string>, ...y: Array<string>) { },
    b: (...x: Array<string>) => { }
}

//// [restParametersWithArrayTypeAnnotations.js]
// Rest parameters must be an array type if they have a type annotation, errors only for the functions with 2 rest params
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
function foo2() {
    var x = [];
    for (var _g = 0; _g < arguments.length; _g++) {
        x[_g] = arguments[_g];
    }
}
var f3 = function foo() {
    var x = [];
    for (var _h = 0; _h < arguments.length; _h++) {
        x[_h] = arguments[_h];
    }
};
var f4 = function () {
    var y = [];
    for (var _j = 1; _j < arguments.length; _j++) {
        y[_j - 1] = arguments[_j];
    }
};
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function () {
        var x = [];
        for (var _k = 0; _k < arguments.length; _k++) {
            x[_k] = arguments[_k];
        }
    };
    return C2;
}());
var a2;
var b2 = {
    foo: function () {
        var x = [];
        for (var _l = 0; _l < arguments.length; _l++) {
            x[_l] = arguments[_l];
        }
    },
    a: function foo() {
        var y = [];
        for (var _m = 1; _m < arguments.length; _m++) {
            y[_m - 1] = arguments[_m];
        }
    },
    b: function () {
        var x = [];
        for (var _o = 0; _o < arguments.length; _o++) {
            x[_o] = arguments[_o];
        }
    }
};
