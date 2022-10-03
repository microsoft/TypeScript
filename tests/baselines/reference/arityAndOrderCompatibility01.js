//// [arityAndOrderCompatibility01.ts]
interface StrNum extends Array<string|number> {
    0: string;
    1: number;
    length: 2;
}

var x: [string, number];
var y: StrNum
var z: {
    0: string;
    1: number;
    length: 2;
}

var [a, b, c] = x;
var [d, e, f] = y;
var [g, h, i] = z;
var j1: [number, number, number] = x;
var j2: [number, number, number] = y;
var j3: [number, number, number] = z;
var k1: [string, number, number] = x;
var k2: [string, number, number] = y;
var k3: [string, number, number] = z;
var l1: [number] = x;
var l2: [number] = y;
var l3: [number] = z;
var m1: [string] = x;
var m2: [string] = y;
var m3: [string] = z;
var n1: [number, string] = x;
var n2: [number, string] = y;
var n3: [number, string] = z;
var o1: [string, number] = x;
var o2: [string, number] = y;
var o3: [string, number] = y;


//// [arityAndOrderCompatibility01.js]
var x;
var y;
var z;
var a = x[0], b = x[1], c = x[2];
var d = y[0], e = y[1], f = y[2];
var g = z[0], h = z[1], i = z[2];
var j1 = x;
var j2 = y;
var j3 = z;
var k1 = x;
var k2 = y;
var k3 = z;
var l1 = x;
var l2 = y;
var l3 = z;
var m1 = x;
var m2 = y;
var m3 = z;
var n1 = x;
var n2 = y;
var n3 = z;
var o1 = x;
var o2 = y;
var o3 = y;
