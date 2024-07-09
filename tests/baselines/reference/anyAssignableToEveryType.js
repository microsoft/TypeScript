//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/anyAssignableToEveryType.ts] ////

//// [anyAssignableToEveryType.ts]
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

var b: number = a;
var c: string = a;
var d: boolean = a;
var e: Date = a;
var f: any = a;
var g: void = a;
var h: Object = a;
var i: {} = a;
var j: () => {} = a;
var k: Function = a;
var l: (x: number) => string = a;
ac = a;
ai = a;
ae = a;
var m: number[] = a;
var n: { foo: string } = a;
var o: <T>(x: T) => T = a;
var p: Number = a;
var q: String = a;

function foo<T, U /*extends T*/, V extends Date>(x: T, y: U, z: V) {
    x = a;
    y = a;
    z = a;
}

//function foo<T, U extends T, V extends Date>(x: T, y: U, z: V) {
//    x = a;
//    y = a;
//    z = a;
//}

//// [anyAssignableToEveryType.js]
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
var b = a;
var c = a;
var d = a;
var e = a;
var f = a;
var g = a;
var h = a;
var i = a;
var j = a;
var k = a;
var l = a;
ac = a;
ai = a;
ae = a;
var m = a;
var n = a;
var o = a;
var p = a;
var q = a;
function foo(x, y, z) {
    x = a;
    y = a;
    z = a;
}
//function foo<T, U extends T, V extends Date>(x: T, y: U, z: V) {
//    x = a;
//    y = a;
//    z = a;
//}
