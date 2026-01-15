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

declare var v: A;
declare var v: B;

v({ s: "", n: 0 }).toLowerCase();

declare var w: A;
declare var w: C;

w({ s: "", n: 0 }).toLowerCase();