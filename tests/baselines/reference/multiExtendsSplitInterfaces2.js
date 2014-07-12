//// [multiExtendsSplitInterfaces2.ts]
interface A {
	a: number;
}

interface I extends A {
	i1: number;
}

interface B {
	b: number;
}

interface I extends B {
	i2: number;
}

var i: I;

var a = i.a;
var i1 = i.i1;
var b = i.b;
var i2 = i.i2;

//// [multiExtendsSplitInterfaces2.js]
var i;
var a = i.a;
var i1 = i.i1;
var b = i.b;
var i2 = i.i2;
