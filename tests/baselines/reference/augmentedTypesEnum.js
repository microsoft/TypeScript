//// [augmentedTypesEnum.ts]
// enum then var
enum e1111 { One } // error
var e1111 = 1; // error

// enum then function
enum e2 { One } // error
function e2() { } // error

enum e3 { One } // error
var e3 = () => { } // error

// enum then class
enum e4 { One } // error
class e4 { public foo() { } } // error

// enum then enum
enum e5 { One }
enum e5 { Two } // error

enum e5a { One } // error
enum e5a { One } // error

// enum then internal module
enum e6 { One } 
module e6 { } // ok

enum e6a { One }
module e6a { var y = 2; } // should be error

enum e6b { One }
module e6b { export var y = 2; } // should be error

// enum then import, messes with error reporting
//enum e7 { One }
//import e7 = require(''); // should be error

//// [augmentedTypesEnum.js]
// enum then var
var e1111;
(function (e1111) {
    e1111[e1111["One"] = 0] = "One";
})(e1111 || (e1111 = {})); // error
var e1111 = 1; // error
// enum then function
var e2;
(function (e2) {
    e2[e2["One"] = 0] = "One";
})(e2 || (e2 = {})); // error
function e2() { } // error
var e3;
(function (e3) {
    e3[e3["One"] = 0] = "One";
})(e3 || (e3 = {})); // error
var e3 = function () { }; // error
// enum then class
var e4;
(function (e4) {
    e4[e4["One"] = 0] = "One";
})(e4 || (e4 = {})); // error
var e4 = /** @class */ (function () {
    function e4() {
    }
    e4.prototype.foo = function () { };
    return e4;
}()); // error
// enum then enum
var e5;
(function (e5) {
    e5[e5["One"] = 0] = "One";
})(e5 || (e5 = {}));
(function (e5) {
    e5[e5["Two"] = 0] = "Two";
})(e5 || (e5 = {})); // error
var e5a;
(function (e5a) {
    e5a[e5a["One"] = 0] = "One";
})(e5a || (e5a = {})); // error
(function (e5a) {
    e5a[e5a["One"] = 0] = "One";
})(e5a || (e5a = {})); // error
// enum then internal module
var e6;
(function (e6) {
    e6[e6["One"] = 0] = "One";
})(e6 || (e6 = {}));
var e6a;
(function (e6a) {
    e6a[e6a["One"] = 0] = "One";
})(e6a || (e6a = {}));
(function (e6a) {
    var y = 2;
})(e6a || (e6a = {})); // should be error
var e6b;
(function (e6b) {
    e6b[e6b["One"] = 0] = "One";
})(e6b || (e6b = {}));
(function (e6b) {
    e6b.y = 2;
})(e6b || (e6b = {})); // should be error
// enum then import, messes with error reporting
//enum e7 { One }
//import e7 = require(''); // should be error
