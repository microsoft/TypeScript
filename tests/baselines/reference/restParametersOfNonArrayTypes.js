//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/restParametersOfNonArrayTypes.ts] ////

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
