//// [constraintSatisfactionWithAny.ts]
// any is not a valid type argument unless there is no constraint, or the constraint is any

function foo<T extends String>(x: T): T { return null; }
function foo2<T extends { x: number }>(x: T): T { return null; }
//function foo3<T extends T[]>(x: T): T { return null; }
function foo4<T extends <T>(x: T) => void>(x: T): T { return null; }
var a;
foo(a);
foo2(a);
//foo3(a);
foo4(a);

var b: number;
foo<any>(b);
foo2<any>(b);
//foo3<any>(b);
foo4<any>(b);

//function foo5<T extends String, U extends T>(x: T, y: U): T { return null; }
//foo5(a, a);
//foo5<any, any>(b, b);

class C<T extends String> {
    constructor(public x: T) { }
}

var c1 = new C(a);
var c2 = new C<any>(b);

class C2<T extends { x: number }> {
    constructor(public x: T) { }
}

var c3 = new C2(a);
var c4 = new C2<any>(b);

//class C3<T extends T[]> {
//    constructor(public x: T) { }
//}

//var c5 = new C3(a);
//var c6 = new C3<any>(b);

class C4<T extends <T>(x:T) => T> {
    constructor(public x: T) { }
}

var c7 = new C4(a);
var c8 = new C4<any>(b);




//// [constraintSatisfactionWithAny.js]
// any is not a valid type argument unless there is no constraint, or the constraint is any
function foo(x) { return null; }
function foo2(x) { return null; }
//function foo3<T extends T[]>(x: T): T { return null; }
function foo4(x) { return null; }
var a;
foo(a);
foo2(a);
//foo3(a);
foo4(a);
var b;
foo(b);
foo2(b);
//foo3<any>(b);
foo4(b);
//function foo5<T extends String, U extends T>(x: T, y: U): T { return null; }
//foo5(a, a);
//foo5<any, any>(b, b);
var C = /** @class */ (function () {
    function C(x) {
        this.x = x;
    }
    return C;
}());
var c1 = new C(a);
var c2 = new C(b);
var C2 = /** @class */ (function () {
    function C2(x) {
        this.x = x;
    }
    return C2;
}());
var c3 = new C2(a);
var c4 = new C2(b);
//class C3<T extends T[]> {
//    constructor(public x: T) { }
//}
//var c5 = new C3(a);
//var c6 = new C3<any>(b);
var C4 = /** @class */ (function () {
    function C4(x) {
        this.x = x;
    }
    return C4;
}());
var c7 = new C4(a);
var c8 = new C4(b);
