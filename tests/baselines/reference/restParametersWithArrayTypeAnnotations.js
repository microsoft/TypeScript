//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/restParametersWithArrayTypeAnnotations.ts] ////

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
function foo2() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
var f3 = function foo() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
};
var f4 = function () {
    var y = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        y[_i - 1] = arguments[_i];
    }
};
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    };
    return C2;
}());
var a2;
var b2 = {
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
