//// [restParametersOfNonArrayTypes2.ts]
// Rest parameters must be an array type if they have a type annotation, 
// user defined subtypes of array do not count, all of these are errors

interface MyThing extends Array<any> { }
interface MyThing2<T> extends Array<T> { }

function foo(...x: MyThing) { }
var f = function foo(...x: MyThing) { }
var f2 = (...x: MyThing, ...y: MyThing) => { }

class C {
    foo(...x: MyThing) { }
}

interface I {
    (...x: MyThing);
    foo(...x: MyThing, ...y: MyThing);
}

var a: {
    (...x: MyThing);
    foo(...x: MyThing);
}

var b = {
    foo(...x: MyThing) { },
    a: function foo(...x: MyThing, ...y: MyThing) { },
    b: (...x: MyThing) => { }
}




function foo2(...x: MyThing2<string>) { }
var f3 = function foo(...x: MyThing2<string>) { }
var f4 = (...x: MyThing2<string>, ...y: MyThing2<string>) => { }

class C2 {
    foo(...x: MyThing2<string>) { }
}

interface I2 {
    (...x: MyThing2<string>);
    foo(...x: MyThing2<string>, ...y: MyThing2<string>);
}

var a2: {
    (...x: MyThing2<string>);
    foo(...x: MyThing2<string>);
}

var b2 = {
    foo(...x: MyThing2<string>) { },
    a: function foo(...x: MyThing2<string>, ...y: MyThing2<string>) { },
    b: (...x: MyThing2<string>) => { }
}

//// [restParametersOfNonArrayTypes2.js]
// Rest parameters must be an array type if they have a type annotation, 
// user defined subtypes of array do not count, all of these are errors
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
