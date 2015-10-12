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