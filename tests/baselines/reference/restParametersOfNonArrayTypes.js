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
function foo() { }
var f = function foo() { };
var f2 = function (x) { };
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
})();
var a;
var b = {
    foo: function () { },
    a: function foo(x) { },
    b: function () { }
};
