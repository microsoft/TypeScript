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
