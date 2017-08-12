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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
// class then module
var c5 = (function () {
    function c5() {
    }
    c5.prototype.foo = function () { };
    __names(c5.prototype, ["foo"]);
    return c5;
}());
var c5a = (function () {
    function c5a() {
    }
    c5a.prototype.foo = function () { };
    __names(c5a.prototype, ["foo"]);
    return c5a;
}());
(function (c5a) {
    var y = 2;
})(c5a || (c5a = {})); // should be ok
var c5b = (function () {
    function c5b() {
    }
    c5b.prototype.foo = function () { };
    __names(c5b.prototype, ["foo"]);
    return c5b;
}());
(function (c5b) {
    c5b.y = 2;
})(c5b || (c5b = {})); // should be ok
//// class then import
var c5c = (function () {
    function c5c() {
    }
    c5c.prototype.foo = function () { };
    __names(c5c.prototype, ["foo"]);
    return c5c;
}());
//import c5c = require(''); 
