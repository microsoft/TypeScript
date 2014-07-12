var x: typeof undefined;

var a: number = x;
var b: boolean = x;
var c: string = x;
var d: void = x;

var e: typeof undefined = x;
e = x; // should work

class C { foo: string }
var f: C;
f = x;

interface I { foo: string }
var g: I;
g = x;

var h: { f(): void } = x;

function i<T>(a: T) {
    a = x;
}