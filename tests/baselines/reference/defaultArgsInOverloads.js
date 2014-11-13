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
function fun() {
    var a = (arguments[0] === void 0) ? null : arguments[0];
}
var C = (function () {
    function C() {
    }
    C.prototype.fun = function () {
        var a = (arguments[0] === void 0) ? null : arguments[0];
    };
    C.fun = function () {
        var a = (arguments[0] === void 0) ? null : arguments[0];
    };
    return C;
})();
var f;
