//// [strictModeUseContextualKeyword.ts]
"use strict"
var as = 0;
function foo(as: string) { }
class C {
    public as() { }
}
function F() {
    function as() { }
}
function H() {
    let {as} = { as: 1 };
}


//// [strictModeUseContextualKeyword.js]
"use strict";
var as = 0;
function foo(as) { }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.as = function () { };
    return C;
}());
function F() {
    function as() { }
}
function H() {
    var as = { as: 1 }.as;
}
