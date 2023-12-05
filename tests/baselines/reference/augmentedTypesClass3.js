//// [tests/cases/compiler/augmentedTypesClass3.ts] ////

//// [augmentedTypesClass3.ts]
// class then module
class c5 { public foo() { } }
module c5 { } // should be ok

class c5a { public foo() { } }
module c5a { var y = 2; } // should be ok

class c5b { public foo() { } }
module c5b { export var y = 2; } // should be ok

//// class then import
class c5c { public foo() { } }
//import c5c = require('');

//// [augmentedTypesClass3.js]
// class then module
var c5 = /** @class */ (function () {
    function c5() {
    }
    c5.prototype.foo = function () { };
    return c5;
}());
var c5a = /** @class */ (function () {
    function c5a() {
    }
    c5a.prototype.foo = function () { };
    return c5a;
}());
(function (c5a) {
    var y = 2;
})(c5a || (c5a = {})); // should be ok
var c5b = /** @class */ (function () {
    function c5b() {
    }
    c5b.prototype.foo = function () { };
    return c5b;
}());
(function (c5b) {
    c5b.y = 2;
})(c5b || (c5b = {})); // should be ok
//// class then import
var c5c = /** @class */ (function () {
    function c5c() {
    }
    c5c.prototype.foo = function () { };
    return c5c;
}());
//import c5c = require('');
