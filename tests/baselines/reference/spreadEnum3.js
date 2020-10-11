//// [spreadEnum3.ts]
enum LiteralEnum1 {
    A,
    B,
    C
}

enum LiteralEnum2 {
    A = 1,
    B = 2,
    C = 3
}

enum LiteralEnum3 {
    A = 'A' + 'A',
    B = 'B' + 'B'
}

enum NumericEnum1 {
    A = 1 + 1,
    B = 2 + 1,
    C = 3 + 1
}

enum NumericEnum2 {
    A = LiteralEnum1.A,
    B = LiteralEnum2.B
}

enum NumericEnum3 {
    ['A'] = LiteralEnum1.A,
    ['B'] = LiteralEnum2.B
}

const enum ConstEnum {
    A = 'A',
    B = 'B'
}

enum R1 {
    ...LiteralEnum1,
    R1 = 'R1'
}

enum R2 {
    ...LiteralEnum2,
    R2 = 'R2'
}

enum R3 {
    ...LiteralEnum3,
    R3 = 'R3'
}

enum R4 {
    ...NumericEnum1,
    R4 = 'R4'
}

enum R5 {
    ...NumericEnum2,
    R5 = 'R5'
}

enum R6 {
    ...NumericEnum3,
    R6 = 'R6'
}

enum R7 {
    ...ConstEnum,
    R7 = 'R7'
}

const enum R8 {
    ...LiteralEnum1,
    R8 = 'R8'
}


//// [spreadEnum3.js]
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
    LiteralEnum1[LiteralEnum1["C"] = 2] = "C";
})(LiteralEnum1 || (LiteralEnum1 = {}));
var LiteralEnum2;
(function (LiteralEnum2) {
    LiteralEnum2[LiteralEnum2["A"] = 1] = "A";
    LiteralEnum2[LiteralEnum2["B"] = 2] = "B";
    LiteralEnum2[LiteralEnum2["C"] = 3] = "C";
})(LiteralEnum2 || (LiteralEnum2 = {}));
var LiteralEnum3;
(function (LiteralEnum3) {
    LiteralEnum3["A"] = "AA";
    LiteralEnum3["B"] = "BB";
})(LiteralEnum3 || (LiteralEnum3 = {}));
var NumericEnum1;
(function (NumericEnum1) {
    NumericEnum1[NumericEnum1["A"] = 2] = "A";
    NumericEnum1[NumericEnum1["B"] = 3] = "B";
    NumericEnum1[NumericEnum1["C"] = 4] = "C";
})(NumericEnum1 || (NumericEnum1 = {}));
var NumericEnum2;
(function (NumericEnum2) {
    NumericEnum2[NumericEnum2["A"] = 0] = "A";
    NumericEnum2[NumericEnum2["B"] = 2] = "B";
})(NumericEnum2 || (NumericEnum2 = {}));
var NumericEnum3;
(function (NumericEnum3) {
    NumericEnum3[NumericEnum3['A'] = 0] = 'A';
    NumericEnum3[NumericEnum3['B'] = 2] = 'B';
})(NumericEnum3 || (NumericEnum3 = {}));
var R1;
(function (R1) {
    __assign(R1, LiteralEnum1);
    R1["R1"] = "R1";
})(R1 || (R1 = {}));
var R2;
(function (R2) {
    __assign(R2, LiteralEnum2);
    R2["R2"] = "R2";
})(R2 || (R2 = {}));
var R3;
(function (R3) {
    __assign(R3, LiteralEnum3);
    R3["R3"] = "R3";
})(R3 || (R3 = {}));
var R4;
(function (R4) {
    __assign(R4, NumericEnum1);
    R4["R4"] = "R4";
})(R4 || (R4 = {}));
var R5;
(function (R5) {
    __assign(R5, NumericEnum2);
    R5["R5"] = "R5";
})(R5 || (R5 = {}));
var R6;
(function (R6) {
    __assign(R6, NumericEnum3);
    R6["R6"] = "R6";
})(R6 || (R6 = {}));
var R7;
(function (R7) {
    __assign(R7, ConstEnum);
    R7["R7"] = "R7";
})(R7 || (R7 = {}));


//// [spreadEnum3.d.ts]
declare enum LiteralEnum1 {
    A = 0,
    B = 1,
    C = 2
}
declare enum LiteralEnum2 {
    A = 1,
    B = 2,
    C = 3
}
declare enum LiteralEnum3 {
    A = "AA",
    B = "BB"
}
declare enum NumericEnum1 {
    A = 2,
    B = 3,
    C = 4
}
declare enum NumericEnum2 {
    A = 0,
    B = 2
}
declare enum NumericEnum3 {
    ['A'] = 0,
    ['B'] = 2
}
declare const enum ConstEnum {
    A = "A",
    B = "B"
}
declare enum R1 {
    ...LiteralEnum1,
    R1 = "R1"
}
declare enum R2 {
    ...LiteralEnum2,
    R2 = "R2"
}
declare enum R3 {
    ...LiteralEnum3,
    R3 = "R3"
}
declare enum R4 {
    ...NumericEnum1,
    R4 = "R4"
}
declare enum R5 {
    ...NumericEnum2,
    R5 = "R5"
}
declare enum R6 {
    ...NumericEnum3,
    R6 = "R6"
}
declare enum R7 {
    ...ConstEnum,
    R7 = "R7"
}
declare const enum R8 {
    ...LiteralEnum1,
    R8 = "R8"
}
