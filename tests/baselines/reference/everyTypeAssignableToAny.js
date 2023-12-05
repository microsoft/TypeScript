//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/everyTypeAssignableToAny.ts] ////

//// [everyTypeAssignableToAny.ts]
var a: any;

class C {
    foo: string;
}
var ac: C;
interface I {
    foo: string;
}
var ai: I;

enum E { A }
var ae: E;

var b: number;
var c: string;
var d: boolean;
var e: Date;
var f: any;
var g: void;
var h: Object;
var i: {};
var j: () => {};
var k: Function;
var l: (x: number) => string;
var m: number[];
var n: { foo: string };
var o: <T>(x: T) => T;
var p: Number;
var q: String;

a = b;
a = c;
a = d;
a = e;
a = f;
a = g;
a = h;
a = i;
a = j;
a = k;
a = l;
a = m;
a = o;
a = p; 
a = q;
a = ac;
a = ai;
a = ae;

function foo<T, U /*extends T*/, V extends Date>(x: T, y: U, z: V) {
    a = x;
    a = y;
    a = z;
}
//function foo<T, U extends T, V extends Date>(x: T, y: U, z: V) {
//    a = x;
//    a = y;
//    a = z;
//}

//// [everyTypeAssignableToAny.js]
var a;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var ac;
var ai;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var ae;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var i;
var j;
var k;
var l;
var m;
var n;
var o;
var p;
var q;
a = b;
a = c;
a = d;
a = e;
a = f;
a = g;
a = h;
a = i;
a = j;
a = k;
a = l;
a = m;
a = o;
a = p;
a = q;
a = ac;
a = ai;
a = ae;
function foo(x, y, z) {
    a = x;
    a = y;
    a = z;
}
//function foo<T, U extends T, V extends Date>(x: T, y: U, z: V) {
//    a = x;
//    a = y;
//    a = z;
//}
