//// [overloadConsecutiveness.ts]
// Making sure compiler won't break with declarations that are consecutive in the AST but not consecutive in the source. Syntax errors intentional.

function f1(), function f1();
function f2(), function f2() {}
function f3() {}, function f3();

class C {
	m1(), m1();
	m2(), m2() {}
	m3() {}, m3();
}


//// [overloadConsecutiveness.js]
// Making sure compiler won't break with declarations that are consecutive in the AST but not consecutive in the source. Syntax errors intentional.
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
function f1() { }
function f2() { }
function f2() { }
function f3() { }
var C = (function () {
    function C() {
    }
    C.prototype.m1 = function () { };
    C.prototype.m2 = function () { };
    C.prototype.m2 = function () { };
    C.prototype.m3 = function () { };
    __names(C.prototype, ["m1", "m2", "m2", "m3"]);
    return C;
}());
