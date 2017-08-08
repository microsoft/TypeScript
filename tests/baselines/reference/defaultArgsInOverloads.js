//// [defaultArgsInOverloads.ts]
function fun(a: string);
function fun(a = 3);
function fun(a = null) { }

class C {
	fun(a: string);
	fun(a = 3);
	fun(a = null) { }
	static fun(a: string);
	static fun(a = 3);
	static fun(a = null) { }
}

interface I {
    fun(a: string);
    fun(a = 3);
}

var f: (a = 3) => number;

//// [defaultArgsInOverloads.js]
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
function fun(a) {
    if (a === void 0) { a = null; }
}
var C = (function () {
    function C() {
    }
    C.prototype.fun = function (a) {
        if (a === void 0) { a = null; }
    };
    C.fun = function (a) {
        if (a === void 0) { a = null; }
    };
    __names(C.prototype, ["fun"]);
    return C;
}());
var f;
