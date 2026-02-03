//// [tests/cases/compiler/genericClasses2.ts] ////

//// [genericClasses2.ts]
interface Foo<T> {
	a: T;
}

class C<T> {
	public x: T;
	public y: Foo<T>;
	public z: Foo<number>;
}

var v1 : C<string>;

var y = v1.x; // should be 'string'
var w = v1.y.a; // should be 'string'
var z = v1.z.a; // should be 'number'

//// [genericClasses2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var v1;
var y = v1.x; // should be 'string'
var w = v1.y.a; // should be 'string'
var z = v1.z.a; // should be 'number'


//// [genericClasses2.d.ts]
interface Foo<T> {
    a: T;
}
declare class C<T> {
    x: T;
    y: Foo<T>;
    z: Foo<number>;
}
declare var v1: C<string>;
declare var y: string;
declare var w: string;
declare var z: number;
