//// [tests/cases/conformance/classes/staticIndexSignature/staticIndexSignature4.ts] ////

//// [staticIndexSignature4.ts]
class B {
    static readonly [s: string]: number;
    static readonly [s: number]: 42 | 233
}

class D {
    static [s: string]: number;
    static [s: number]: 42 | 233
}

interface IB {
    static [s: string]: number;
    static [s: number]: 42 | 233;
}

declare const v: number
declare const i: IB
if (v === 0) {
    B.a = D.a
    B[2] = D[2]
} else if (v === 1) {
    D.a = B.a
    D[2] = B[2]
} else if (v === 2) {
    B.a = i.a
    B[2] = i[2]
    D.a = i.a
    D[2] = i [2]
} else if (v === 3) {
    i.a = B.a
    i[2] = B[2]
} else if (v === 4) {
    i.a = D.a
    i[2] = B[2]
}


//// [staticIndexSignature4.js]
"use strict";
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
if (v === 0) {
    B.a = D.a;
    B[2] = D[2];
}
else if (v === 1) {
    D.a = B.a;
    D[2] = B[2];
}
else if (v === 2) {
    B.a = i.a;
    B[2] = i[2];
    D.a = i.a;
    D[2] = i[2];
}
else if (v === 3) {
    i.a = B.a;
    i[2] = B[2];
}
else if (v === 4) {
    i.a = D.a;
    i[2] = B[2];
}
