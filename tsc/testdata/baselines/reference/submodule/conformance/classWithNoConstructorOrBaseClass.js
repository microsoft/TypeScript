//// [tests/cases/conformance/classes/members/constructorFunctionTypes/classWithNoConstructorOrBaseClass.ts] ////

//// [classWithNoConstructorOrBaseClass.ts]
class C {
    x: string;
}

var c = new C();
var r = C;

class D<T,U> {
    x: T;
    y: U;
}

var d = new D();
var d2 = new D<string, number>();
var r2 = D;


//// [classWithNoConstructorOrBaseClass.js]
class C {
    x;
}
var c = new C();
var r = C;
class D {
    x;
    y;
}
var d = new D();
var d2 = new D();
var r2 = D;
