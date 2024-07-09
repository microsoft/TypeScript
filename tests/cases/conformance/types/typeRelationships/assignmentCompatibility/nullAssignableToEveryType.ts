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

var b: number = null;
var c: string = null;
var d: boolean = null;
var e: Date = null;
var f: any = null;
var g: void = null;
var h: Object = null;
var i: {} = null;
var j: () => {} = null;
var k: Function = null;
var l: (x: number) => string = null;
ac = null;
ai = null;
ae = null;
var m: number[] = null;
var n: { foo: string } = null;
var o: <T>(x: T) => T = null;
var p: Number = null;
var q: String = null;

function foo<T, U, V extends Date>(x: T, y: U, z: V) {
    x = null;
    y = null;
    z = null;
}

//function foo<T, U extends T, V extends Date>(x: T, y: U, z: V) {
//    x = null;
//    y = null;
//    z = null;
//}