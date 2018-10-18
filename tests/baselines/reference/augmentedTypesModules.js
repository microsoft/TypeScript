//// [augmentedTypesModules.ts]
// module then var
module m1 { }
var m1 = 1; // Should be allowed

module m1a { var y = 2; } // error
var m1a = 1; // error

module m1b { export var y = 2; } // error
var m1b = 1; // error

module m1c {
    export interface I { foo(): void; }
}
var m1c = 1; // Should be allowed

module m1d { // error
    export class I { foo() { } }
}
var m1d = 1; // error

// module then function
module m2 { }
function m2() { }; // ok since the module is not instantiated

module m2a { var y = 2; }
function m2a() { }; // error since the module is instantiated

module m2b { export var y = 2; }
function m2b() { };  // error since the module is instantiated

// should be errors to have function first
function m2c() { }; 
module m2c { export var y = 2; } 

module m2d { }
declare function m2d(): void; 

declare function m2e(): void; 
module m2e { }

function m2f() { };
module m2f { export interface I { foo(): void } } 

function m2g() { };
module m2g { export class C { foo() { } } } 

// module then class
module m3 { }
class m3 { } // ok since the module is not instantiated

module m3a { var y = 2; }
class m3a { foo() { } } // error, class isn't ambient or declared before the module

class m3b { foo() { } }
module m3b { var y = 2; }

class m3c { foo() { } }
module m3c { export var y = 2; } 

declare class m3d { foo(): void }
module m3d { export var y = 2; } 

module m3e { export var y = 2; } 
declare class m3e { foo(): void } 

declare class m3f { foo(): void }
module m3f { export interface I { foo(): void } }

declare class m3g { foo(): void }
module m3g { export class C { foo() { } } }

// module then enum
// should be errors
module m4 { }
enum m4 { }

module m4a { var y = 2; }
enum m4a { One }

module m4b { export var y = 2; }
enum m4b { One }

module m4c { interface I { foo(): void } }
enum m4c { One }

module m4d { class C { foo() { } } }
enum m4d { One }

//// module then module

module m5 { export var y = 2; }
module m5 { export interface I { foo(): void } } // should already be reasonably well covered

// module then import
module m6 { export var y = 2; }
//import m6 = require('');


//// [augmentedTypesModules.js]
var m1 = 1; // Should be allowed
var m1a;
(function (m1a) {
    var y = 2;
})(m1a || (m1a = {})); // error
var m1a = 1; // error
var m1b;
(function (m1b) {
    m1b.y = 2;
})(m1b || (m1b = {})); // error
var m1b = 1; // error
var m1c = 1; // Should be allowed
var m1d;
(function (m1d) {
    var I = /** @class */ (function () {
        function I() {
        }
        I.prototype.foo = function () { };
        return I;
    }());
    m1d.I = I;
})(m1d || (m1d = {}));
var m1d = 1; // error
function m2() { }
; // ok since the module is not instantiated
var m2a;
(function (m2a) {
    var y = 2;
})(m2a || (m2a = {}));
function m2a() { }
; // error since the module is instantiated
var m2b;
(function (m2b) {
    m2b.y = 2;
})(m2b || (m2b = {}));
function m2b() { }
; // error since the module is instantiated
// should be errors to have function first
function m2c() { }
;
(function (m2c) {
    m2c.y = 2;
})(m2c || (m2c = {}));
function m2f() { }
;
function m2g() { }
;
(function (m2g) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        return C;
    }());
    m2g.C = C;
})(m2g || (m2g = {}));
var m3 = /** @class */ (function () {
    function m3() {
    }
    return m3;
}()); // ok since the module is not instantiated
var m3a;
(function (m3a) {
    var y = 2;
})(m3a || (m3a = {}));
var m3a = /** @class */ (function () {
    function m3a() {
    }
    m3a.prototype.foo = function () { };
    return m3a;
}()); // error, class isn't ambient or declared before the module
var m3b = /** @class */ (function () {
    function m3b() {
    }
    m3b.prototype.foo = function () { };
    return m3b;
}());
(function (m3b) {
    var y = 2;
})(m3b || (m3b = {}));
var m3c = /** @class */ (function () {
    function m3c() {
    }
    m3c.prototype.foo = function () { };
    return m3c;
}());
(function (m3c) {
    m3c.y = 2;
})(m3c || (m3c = {}));
var m3d;
(function (m3d) {
    m3d.y = 2;
})(m3d || (m3d = {}));
var m3e;
(function (m3e) {
    m3e.y = 2;
})(m3e || (m3e = {}));
var m3g;
(function (m3g) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        return C;
    }());
    m3g.C = C;
})(m3g || (m3g = {}));
var m4;
(function (m4) {
})(m4 || (m4 = {}));
var m4a;
(function (m4a) {
    var y = 2;
})(m4a || (m4a = {}));
(function (m4a) {
    m4a[m4a["One"] = 0] = "One";
})(m4a || (m4a = {}));
var m4b;
(function (m4b) {
    m4b.y = 2;
})(m4b || (m4b = {}));
(function (m4b) {
    m4b[m4b["One"] = 0] = "One";
})(m4b || (m4b = {}));
var m4c;
(function (m4c) {
    m4c[m4c["One"] = 0] = "One";
})(m4c || (m4c = {}));
var m4d;
(function (m4d) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        return C;
    }());
})(m4d || (m4d = {}));
(function (m4d) {
    m4d[m4d["One"] = 0] = "One";
})(m4d || (m4d = {}));
//// module then module
var m5;
(function (m5) {
    m5.y = 2;
})(m5 || (m5 = {}));
// module then import
var m6;
(function (m6) {
    m6.y = 2;
})(m6 || (m6 = {}));
//import m6 = require('');
