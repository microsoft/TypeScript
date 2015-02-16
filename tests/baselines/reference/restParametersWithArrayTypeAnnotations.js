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
function foo2() { }
var f3 = function foo() { };
var f4 = function (x) { };
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function () { };
    return C2;
})();
var a2;
var b2 = {
    foo: function () { },
    a: function foo(x) { },
    b: function () { }
};
