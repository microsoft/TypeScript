//// [callSignaturesWithAccessibilityModifiersOnParameters.ts]
// Call signature parameters do not allow accessibility modifiers

function foo(public x, private y) { }
var f = function foo(public x, private y) { }
var f2 = function (public x, private y) { }
var f3 = (x, private y) => { }
var f4 = <T>(public x: T, y: T) => { }

function foo2(private x: string, public y: number) { }
var f5 = function foo(private x: string, public y: number) { }
var f6 = function (private x: string, public y: number) { }
var f7 = (private x: string, public y: number) => { }
var f8 = <T>(private x: T, public y: T) => { }

class C {
    foo(public x, private y) { }
    foo2(public x: number, private y: string) { }
    foo3<T>(public x: T, private y: T) { }
}

interface I {
    (private x, public y);
    (private x: string, public y: number);
    foo(private x, public y);
    foo(public x: number, y: string);
    foo3<T>(x: T, private y: T);
}

var a: {
    foo(public x, private y);
    foo2(private x: number, public y: string);
};

var b = {
    foo(public x, y) { },
    a: function foo(x: number, private y: string) { },
    b: <T>(public x: T, private y: T) => { }
}

//// [callSignaturesWithAccessibilityModifiersOnParameters.js]
// Call signature parameters do not allow accessibility modifiers
function foo(x, y) { }
var f = function foo(x, y) { };
var f2 = function (x, y) { };
var f3 = function (x, y) { };
var f4 = function (x, y) { };
function foo2(x, y) { }
var f5 = function foo(x, y) { };
var f6 = function (x, y) { };
var f7 = function (x, y) { };
var f8 = function (x, y) { };
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) { };
    C.prototype.foo2 = function (x, y) { };
    C.prototype.foo3 = function (x, y) { };
    return C;
}());
var a;
var b = {
    foo: function (x, y) { },
    a: function foo(x, y) { },
    b: function (x, y) { }
};
