var x = true;

var a: number = x;
var b: string = x;
var c: void = x;
var d: typeof undefined = x;

enum E { A }
var e: E = x;

class C { foo: string }
var f: C = x;

interface I { bar: string }
var g: I = x;

var h: { (): string } = x;
var h2: { toString(): string } = x; // no error

module M { export var a = 1; }
M = x;

function i<T>(a: T) {
    a = x;
}
i = x;