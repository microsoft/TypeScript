//// [tests/cases/compiler/augmentedTypesVar.ts] ////

//// [augmentedTypesVar.ts]
// var then var
var x1 = 1;
var x1 = 2;

// var then function
var x2 = 1; // error
function x2() { } // error

var x3 = 1; 
var x3 = () => { } // error

// var then class
var x4 = 1; // error
class x4 { } // error

var x4a = 1; // error
class x4a { public foo() { } } // error

// var then enum
var x5 = 1;
enum x5 { One } // error

// var then module
var x6 = 1;
module x6 { } // ok since non-instantiated

var x6a = 1; // error
module x6a { var y = 2; } // error since instantiated

var x6b = 1; // error
module x6b { export var y = 2; } // error

// var then import, messes with other error reporting
//var x7 = 1;
//import x7 = require('');


//// [augmentedTypesVar.js]
var x1 = 1;
var x1 = 2;
var x2 = 1;
function x2() { }
var x3 = 1;
var x3 = () => { };
var x4 = 1;
class x4 {
}
var x4a = 1;
class x4a {
    foo() { }
}
var x5 = 1;
(function (x5) {
    x5[x5["One"] = 0] = "One";
})(x5 || (x5 = {}));
var x6 = 1;
var x6a = 1;
(function (x6a) {
    var y = 2;
})(x6a || (x6a = {}));
var x6b = 1;
(function (x6b) {
    x6b.y = 2;
})(x6b || (x6b = {}));
