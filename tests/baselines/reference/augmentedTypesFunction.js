//// [augmentedTypesFunction.ts]
// function then var
function y1() { } // error
var y1 = 1; // error

// function then function
function y2() { } // error
function y2() { } // error

function y2a() { }  // error
var y2a = () => { } // error

// function then class
function y3() { } // error
class y3 { } // error

function y3a() { } // error
class y3a { public foo() { } } // error

// function then enum
function y4() { } // error
enum y4 { One } // error

// function then internal module
function y5() { }
module y5 { } // ok since module is not instantiated

function y5a() { }
module y5a { var y = 2; } // should be an error

function y5b() { }
module y5b { export var y = 3; } // should be an error

function y5c() { }
module y5c { export interface I { foo(): void } } // should be an error

// function then import, messes with other errors
//function y6() { }
//import y6 = require('');

//// [augmentedTypesFunction.js]
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
// function then var
function y1() { } // error
var y1 = 1; // error
// function then function
function y2() { } // error
function y2() { } // error
function y2a() { } // error
var y2a = function () { }; // error
// function then class
function y3() { } // error
var y3 = (function () {
    function y3() {
    }
    return y3;
}()); // error
function y3a() { } // error
var y3a = (function () {
    function y3a() {
    }
    y3a.prototype.foo = function () { };
    __names(y3a.prototype, ["foo"]);
    return y3a;
}()); // error
// function then enum
function y4() { } // error
(function (y4) {
    y4[y4["One"] = 0] = "One";
})(y4 || (y4 = {})); // error
// function then internal module
function y5() { }
function y5a() { }
(function (y5a) {
    var y = 2;
})(y5a || (y5a = {})); // should be an error
function y5b() { }
(function (y5b) {
    y5b.y = 3;
})(y5b || (y5b = {})); // should be an error
function y5c() { }
// function then import, messes with other errors
//function y6() { }
//import y6 = require(''); 
