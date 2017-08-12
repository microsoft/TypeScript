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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.as = function () { };
    return C;
}());
function F() {
    function as() { }
}
function H() {
    var as = { as: 1 }.as;
}
