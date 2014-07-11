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
var C = (function () {
    function C() {
    }
    return C;
})();
var v1;
var y = v1.x;
var w = v1.y.a;
var z = v1.z.a;


//// [genericClasses2.d.ts]
interface Foo<T> {
    a;
}
declare class C<T> {
    x;
    y;
    z;
}
declare var v1;
declare var y;
declare var w;
declare var z;
