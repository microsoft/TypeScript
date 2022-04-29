// @noimplicitany: true

class C<T> {
    x: T;
}

var c = new C();
var c2 = new C<any>();
var c3 = new C<number>();
var c4: C<any> = new C();

class D<T> {
    constructor(x: T) { }
}

var d = new D(null);
var d2 = new D(1);
var d3 = new D<any>(1);
var d4 = new D(<any>1);
var d5: D<any> = new D(null);

function foo<T>(): T { return null; };
foo() 
foo<any>();


    