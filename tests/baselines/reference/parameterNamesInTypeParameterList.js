//// [tests/cases/compiler/parameterNamesInTypeParameterList.ts] ////

//// [parameterNamesInTypeParameterList.ts]
function f0<T extends typeof a>(a: T) {
	a.b;
}

function f1<T extends typeof a>({a}: {a:T}) {
	a.b;
}

function f2<T extends typeof a>([a]: T[]) {
	a.b;
}

class A {
	m0<T extends typeof a>(a: T) {
		a.b
	}
	m1<T extends typeof a>({a}: {a:T}) {
		a.b
	}
	m2<T extends typeof a>([a]: T[]) {
		a.b
	}
}

//// [parameterNamesInTypeParameterList.js]
function f0(a) {
    a.b;
}
function f1({ a }) {
    a.b;
}
function f2([a]) {
    a.b;
}
class A {
    m0(a) {
        a.b;
    }
    m1({ a }) {
        a.b;
    }
    m2([a]) {
        a.b;
    }
}
