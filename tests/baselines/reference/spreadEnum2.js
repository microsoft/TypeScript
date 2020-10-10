//// [spreadEnum2.ts]
enum A {
    AA = 'A'
}

enum B {
    ...A,
    BB = 'B'
}

enum C {
    ...B,
    CC = 'C'
}

enum D {
    ...C,
    DD = 'D'
}

enum E {
    ...D,
    EE = 'E'
}

A.AA;

B.AA;
B.BB;

C.AA;
C.BB;
C.CC;

D.AA;
D.BB;
D.CC;
D.DD;

E.AA;
E.BB;
E.CC;
E.DD;
E.EE;

//// [spreadEnum2.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var A;
(function (A) {
    A["AA"] = "A";
})(A || (A = {}));
var B;
(function (B) {
    __assign(B, A);
    B["BB"] = "B";
})(B || (B = {}));
var C;
(function (C) {
    __assign(C, B);
    C["CC"] = "C";
})(C || (C = {}));
var D;
(function (D) {
    __assign(D, C);
    D["DD"] = "D";
})(D || (D = {}));
var E;
(function (E) {
    __assign(E, D);
    E["EE"] = "E";
})(E || (E = {}));
A.AA;
B.AA;
B.BB;
C.AA;
C.BB;
C.CC;
D.AA;
D.BB;
D.CC;
D.DD;
E.AA;
E.BB;
E.CC;
E.DD;
E.EE;


//// [spreadEnum2.d.ts]
declare enum A {
    AA = "A"
}
declare enum B {
    ...A,
    BB = "B"
}
declare enum C {
    ...B,
    CC = "C"
}
declare enum D {
    ...C,
    DD = "D"
}
declare enum E {
    ...D,
    EE = "E"
}
