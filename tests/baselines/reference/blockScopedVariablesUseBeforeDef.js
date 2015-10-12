//// [blockScopedVariablesUseBeforeDef.ts]
function foo1() {
	let a = () => x;
	let x;
}

function foo2() {
	let a = function () { return x; }
	let x;
}

function foo3() {
	class X {
		m() { return x;}
	}
	let x;
}

function foo4() {
	let y = class {
		m() { return x; }
	};
	let x;
}

function foo5() {
	let x = () => y;
	let y = () => x;
}

function foo6() {
	function f() {
		return x;
	}
	let x;
}

//// [blockScopedVariablesUseBeforeDef.js]
function foo1() {
    var a = function () { return x; };
    var x;
}
function foo2() {
    var a = function () { return x; };
    var x;
}
function foo3() {
    var X = (function () {
        function X() {
        }
        X.prototype.m = function () { return x; };
        return X;
    })();
    var x;
}
function foo4() {
    var y = (function () {
        function class_1() {
        }
        class_1.prototype.m = function () { return x; };
        return class_1;
    })();
    var x;
}
function foo5() {
    var x = function () { return y; };
    var y = function () { return x; };
}
function foo6() {
    function f() {
        return x;
    }
    var x;
}
