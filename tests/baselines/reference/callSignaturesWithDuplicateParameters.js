//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/callSignaturesWithDuplicateParameters.ts] ////

//// [callSignaturesWithDuplicateParameters.ts]
// Duplicate parameter names are always an error

function foo(x, x) { }
var f = function foo(x, x) { }
var f2 = function (x, x) { }
var f3 = (x, x) => { }
var f4 = <T>(x: T, x: T) => { }

function foo2(x: string, x: number) { }
var f5 = function foo(x: string, x: number) { }
var f6 = function (x: string, x: number) { }
var f7 = (x: string, x: number) => { }
var f8 = <T>(x: T, y: T) => { }

class C {
    foo(x, x) { }
    foo2(x: number, x: string) { }
    foo3<T>(x: T, x: T) { }
}

interface I {
    (x, x);
    (x: string, x: number);
    foo(x, x);
    foo(x: number, x: string);
    foo3<T>(x: T, x: T);
}

var a: {
    foo(x, x);
    foo2(x: number, x: string);
};

var b = {
    foo(x, x) { },
    a: function foo(x: number, x: string) { },
    b: <T>(x: T, x: T) => { }
}

//// [callSignaturesWithDuplicateParameters.js]
// Duplicate parameter names are always an error
function foo(x, x) { }
var f = function foo(x, x) { };
var f2 = function (x, x) { };
var f3 = function (x, x) { };
var f4 = function (x, x) { };
function foo2(x, x) { }
var f5 = function foo(x, x) { };
var f6 = function (x, x) { };
var f7 = function (x, x) { };
var f8 = function (x, y) { };
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x, x) { };
    C.prototype.foo2 = function (x, x) { };
    C.prototype.foo3 = function (x, x) { };
    return C;
}());
var a;
var b = {
    foo: function (x, x) { },
    a: function foo(x, x) { },
    b: function (x, x) { }
};
