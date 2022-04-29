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
