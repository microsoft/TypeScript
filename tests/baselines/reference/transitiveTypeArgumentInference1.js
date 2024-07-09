//// [tests/cases/compiler/transitiveTypeArgumentInference1.ts] ////

//// [transitiveTypeArgumentInference1.ts]
interface I1<T, U> {
	m(value: T): U;
}

var i: I1<boolean, string> = null;

class C<T> {
	constructor(p: I1<boolean, T>) {
	}
}

var c = new C(i);


//// [transitiveTypeArgumentInference1.js]
var i = null;
var C = /** @class */ (function () {
    function C(p) {
    }
    return C;
}());
var c = new C(i);
