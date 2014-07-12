interface A {
    (x: { s: string }): string
    (x: { n: number }): number
}

interface B {
    (x: { s: string }): string
    (x: { n: number }): number
}

interface C {
    (x: { n: number }): number
    (x: { s: string }): string
}

var v: A;
var v: B;

v({ s: "", n: 0 }).toLowerCase();

var w: A;
var w: C;

w({ s: "", n: 0 }).toLowerCase();