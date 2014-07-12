enum E { a, b, c }

var a: boolean;
var b: number;
var c: string;
var d: void;
var e: E;
var f: { a: string };
var g: any[];

function foo<T, U>(t: T, u: U) {
    var r1 = t < u;
    var r2 = t > u;
    var r3 = t <= u;
    var r4 = t >= u;
    var r5 = t == u;
    var r6 = t != u;
    var r7 = t === u;
    var r8 = t !== u;

    // operator <
    var r1a1 = t < a;
    var r1a2 = t < b;
    var r1a3 = t < c;
    var r1a4 = t < d;
    var r1a5 = t < e;
    var r1a6 = t < f;
    var r1a7 = t < g;

    var r1b1 = a < t;
    var r1b2 = b < t;
    var r1b3 = c < t;
    var r1b4 = d < t;
    var r1b5 = e < t;
    var r1b6 = f < t;
    var r1b7 = g < t;

    // operator >
    var r2a1 = t < a;
    var r2a2 = t < b;
    var r2a3 = t < c;
    var r2a4 = t < d;
    var r2a5 = t < e;
    var r2a6 = t < f;
    var r2a7 = t < g;

    var r2b1 = a < t;
    var r2b2 = b < t;
    var r2b3 = c < t;
    var r2b4 = d < t;
    var r2b5 = e < t;
    var r2b6 = f < t;
    var r2b7 = g < t;

    // operator <=
    var r3a1 = t < a;
    var r3a2 = t < b;
    var r3a3 = t < c;
    var r3a4 = t < d;
    var r3a5 = t < e;
    var r3a6 = t < f;
    var r3a7 = t < g;

    var r3b1 = a < t;
    var r3b2 = b < t;
    var r3b3 = c < t;
    var r3b4 = d < t;
    var r3b5 = e < t;
    var r3b6 = f < t;
    var r3b7 = g < t;

    // operator >=
    var r4a1 = t < a;
    var r4a2 = t < b;
    var r4a3 = t < c;
    var r4a4 = t < d;
    var r4a5 = t < e;
    var r4a6 = t < f;
    var r4a7 = t < g;

    var r4b1 = a < t;
    var r4b2 = b < t;
    var r4b3 = c < t;
    var r4b4 = d < t;
    var r4b5 = e < t;
    var r4b6 = f < t;
    var r4b7 = g < t;

    // operator ==
    var r5a1 = t < a;
    var r5a2 = t < b;
    var r5a3 = t < c;
    var r5a4 = t < d;
    var r5a5 = t < e;
    var r5a6 = t < f;
    var r5a7 = t < g;

    var r5b1 = a < t;
    var r5b2 = b < t;
    var r5b3 = c < t;
    var r5b4 = d < t;
    var r5b5 = e < t;
    var r5b6 = f < t;
    var r5b7 = g < t;

    // operator !=
    var r6a1 = t < a;
    var r6a2 = t < b;
    var r6a3 = t < c;
    var r6a4 = t < d;
    var r6a5 = t < e;
    var r6a6 = t < f;
    var r6a7 = t < g;

    var r6b1 = a < t;
    var r6b2 = b < t;
    var r6b3 = c < t;
    var r6b4 = d < t;
    var r6b5 = e < t;
    var r6b6 = f < t;
    var r6b7 = g < t;

    // operator ===
    var r7a1 = t < a;
    var r7a2 = t < b;
    var r7a3 = t < c;
    var r7a4 = t < d;
    var r7a5 = t < e;
    var r7a6 = t < f;
    var r7a7 = t < g;

    var r7b1 = a < t;
    var r7b2 = b < t;
    var r7b3 = c < t;
    var r7b4 = d < t;
    var r7b5 = e < t;
    var r7b6 = f < t;
    var r7b7 = g < t;

    // operator !==
    var r8a1 = t < a;
    var r8a2 = t < b;
    var r8a3 = t < c;
    var r8a4 = t < d;
    var r8a5 = t < e;
    var r8a6 = t < f;
    var r8a7 = t < g;

    var r8b1 = a < t;
    var r8b2 = b < t;
    var r8b3 = c < t;
    var r8b4 = d < t;
    var r8b5 = e < t;
    var r8b6 = f < t;
    var r8b7 = g < t;
}