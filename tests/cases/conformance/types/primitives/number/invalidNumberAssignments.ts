var x = 1;

var a: boolean = x;
var b: string = x;
var c: void = x;
var d: typeof undefined = x;

class C { foo: string; }
var e: C = x;

interface I { bar: string; }
var f: I = x;

var g: { baz: string } = 1;
var g2: { 0: number } = 1;

module M { export var x = 1; }
M = x;

function i<T>(a: T) {
    a = x;
}
i = x;