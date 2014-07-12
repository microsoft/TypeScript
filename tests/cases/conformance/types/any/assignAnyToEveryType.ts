// all of these are valid

var x: any;

var a: number = x;
var b: boolean = x;
var c: string = x;
var d: void = x;
var e = null;
e = x;
var f = undefined;
f = x;

enum E {
    A
}

var g: E = x;
var g2 = E.A;
g2 = x;

class C {
    foo: string;
}

var h: C = x;

interface I {
    foo: string;
}

var i: I = x;

var j: { (): string } = x;
var j2: { <T>(x: T): string } = x;

module M {
    export var foo = 1;
}

M = x;

function k<T>(a: T) {
    a = x;
}