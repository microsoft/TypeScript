//// [spreadEnum6.ts]
enum LiteralEnum1 {
    A = 0,
    B
}

enum LiteralEnum1 {
    C,
    D
}

enum LiteralEnum2 {
    E = 0,
    F
}

enum LiteralEnum2 {
    G,
    H
}

enum R1 {
    ...LiteralEnum1,
    R1 = 'R1'
}

enum R1 {
    R11 = 'R11'
}

enum R2 {
    ...LiteralEnum1,
    R2 = 'R2'
}

enum R2 {
    ...LiteralEnum2,
    R22 = 'R22'
}

enum R3 {
    ...R1,
    ...R2,
    R3 = 'R3'
}

LiteralEnum1.A;
LiteralEnum1.B;
LiteralEnum1.C;
LiteralEnum1.D;
R1.A;
R1.B;
R1.C;
R1.D;
R1.R1;
R1.R11;

LiteralEnum2.E;
LiteralEnum2.F;
LiteralEnum2.G;
LiteralEnum2.H;
R2.A;
R2.B;
R2.C;
R2.D;
R2.E;
R2.F;
R2.G;
R2.H;
R2.R2;
R2.R22

R3.A;
R3.B;
R3.C;
R3.D;
R3.E;
R3.F;
R3.G;
R3.H;
R3.R1;
R3.R11;
R3.R2;
R3.R22;
R3.R3;


//// [spreadEnum6.js]
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
var LiteralEnum1;
(function (LiteralEnum1) {
    LiteralEnum1[LiteralEnum1["A"] = 0] = "A";
    LiteralEnum1[LiteralEnum1["B"] = 1] = "B";
})(LiteralEnum1 || (LiteralEnum1 = {}));
(function (LiteralEnum1) {
    LiteralEnum1[LiteralEnum1["C"] = 0] = "C";
    LiteralEnum1[LiteralEnum1["D"] = 1] = "D";
})(LiteralEnum1 || (LiteralEnum1 = {}));
var LiteralEnum2;
(function (LiteralEnum2) {
    LiteralEnum2[LiteralEnum2["E"] = 0] = "E";
    LiteralEnum2[LiteralEnum2["F"] = 1] = "F";
})(LiteralEnum2 || (LiteralEnum2 = {}));
(function (LiteralEnum2) {
    LiteralEnum2[LiteralEnum2["G"] = 0] = "G";
    LiteralEnum2[LiteralEnum2["H"] = 1] = "H";
})(LiteralEnum2 || (LiteralEnum2 = {}));
var R1;
(function (R1) {
    __assign(R1, LiteralEnum1);
    R1["R1"] = "R1";
})(R1 || (R1 = {}));
(function (R1) {
    R1["R11"] = "R11";
})(R1 || (R1 = {}));
var R2;
(function (R2) {
    __assign(R2, LiteralEnum1);
    R2["R2"] = "R2";
})(R2 || (R2 = {}));
(function (R2) {
    __assign(R2, LiteralEnum2);
    R2["R22"] = "R22";
})(R2 || (R2 = {}));
var R3;
(function (R3) {
    __assign(R3, R1);
    __assign(R3, R2);
    R3["R3"] = "R3";
})(R3 || (R3 = {}));
LiteralEnum1.A;
LiteralEnum1.B;
LiteralEnum1.C;
LiteralEnum1.D;
R1.A;
R1.B;
R1.C;
R1.D;
R1.R1;
R1.R11;
LiteralEnum2.E;
LiteralEnum2.F;
LiteralEnum2.G;
LiteralEnum2.H;
R2.A;
R2.B;
R2.C;
R2.D;
R2.E;
R2.F;
R2.G;
R2.H;
R2.R2;
R2.R22;
R3.A;
R3.B;
R3.C;
R3.D;
R3.E;
R3.F;
R3.G;
R3.H;
R3.R1;
R3.R11;
R3.R2;
R3.R22;
R3.R3;


//// [spreadEnum6.d.ts]
declare enum LiteralEnum1 {
    A = 0,
    B = 1
}
declare enum LiteralEnum1 {
    C = 0,
    D = 1
}
declare enum LiteralEnum2 {
    E = 0,
    F = 1
}
declare enum LiteralEnum2 {
    G = 0,
    H = 1
}
declare enum R1 {
    ...LiteralEnum1,
    R1 = "R1"
}
declare enum R1 {
    R11 = "R11"
}
declare enum R2 {
    ...LiteralEnum1,
    R2 = "R2"
}
declare enum R2 {
    ...LiteralEnum2,
    R22 = "R22"
}
declare enum R3 {
    ...R1,
    ...R2,
    R3 = "R3"
}
