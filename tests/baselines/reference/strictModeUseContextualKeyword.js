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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var as = 0;
function foo(as) { }
var C = (function () {
    function C() {
    }
    C.prototype.as = function () { };
    __names(C.prototype, ["as"]);
    return C;
}());
function F() {
    function as() { }
}
function H() {
    var as = { as: 1 }.as;
}
