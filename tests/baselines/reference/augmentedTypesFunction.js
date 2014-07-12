//// [augmentedTypesFunction.ts]
// function then var
function y1() { }
var y1 = 1; // error

// function then function
function y2() { }
function y2() { } // error

function y2a() { }
var y2a = () => { } // error

// function then class
function y3() { }
class y3 { } // error

function y3a() { }
class y3a { public foo() { } } // error

// function then enum
function y4() { }
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
function y1() {
}
var y1 = 1;
function y2() {
}
function y2() {
}
function y2a() {
}
var y2a = function () {
};
function y3() {
}
var y3 = (function () {
    function y3() {
    }
    return y3;
})();
function y3a() {
}
var y3a = (function () {
    function y3a() {
    }
    y3a.prototype.foo = function () {
    };
    return y3a;
})();
function y4() {
}
var y4;
(function (y4) {
    y4[y4["One"] = 0] = "One";
})(y4 || (y4 = {}));
function y5() {
}
function y5a() {
}
var y5a;
(function (y5a) {
    var y = 2;
})(y5a || (y5a = {}));
function y5b() {
}
var y5b;
(function (y5b) {
    y5b.y = 3;
})(y5b || (y5b = {}));
function y5c() {
}
