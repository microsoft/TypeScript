//// [augmentedTypesModules2.ts]
// module then function
module m2 { }
function m2() { }; // ok since the module is not instantiated

module m2a { var y = 2; }
function m2a() { }; // error since the module is instantiated

module m2b { export var y = 2; }
function m2b() { };  // error since the module is instantiated

function m2c() { }; 
module m2c { export var y = 2; } 

module m2cc { export var y = 2; }
function m2cc() { }; // error to have module first

module m2d { }
declare function m2d(): void; 

declare function m2e(): void; 
module m2e { }

function m2f() { };
module m2f { export interface I { foo(): void } } 

function m2g() { };
module m2g { export class C { foo() { } } } 


//// [augmentedTypesModules2.js]
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
function m2c() { }
;
(function (m2c) {
    m2c.y = 2;
})(m2c || (m2c = {}));
var m2cc;
(function (m2cc) {
    m2cc.y = 2;
})(m2cc || (m2cc = {}));
function m2cc() { }
; // error to have module first
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
