// Making sure compiler won't break with declarations that are consecutive in the AST but not consecutive in the source. Syntax errors intentional.

function f1(), function f1();
function f2(), function f2() {}
function f3() {}, function f3();

class C {
	m1(), m1();
	m2(), m2() {}
	m3() {}, m3();
}
