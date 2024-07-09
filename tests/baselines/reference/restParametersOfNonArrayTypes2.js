//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/restParametersOfNonArrayTypes2.ts] ////

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
