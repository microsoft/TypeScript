//// [spreadEnum7.ts]
enum R1 {
    ...LiteralEnum1,
    R1 = 'R1'
}

enum LiteralEnum1 {
    A,
    B
}

enum R2 {
    ...R3,
    R2 = 'R2'
}

enum R3 {
    ...R2,
    R3 = 'R3'
}

enum R4 {
    ...LiteralEnum1,
    R4 = 'R4'
}

enum R5 {
    ...LiteralEnum1,
    R5 = 'R5'
}

enum R6 {
    ...LiteralEnum1,
    ...R4,
    ...R5,
    R6 = 'R6'
}

enum PartEnum1 {
    A = 'A'
}

enum RefEnum1 {
    ...PartEnum1,
    R = 'R'
}

enum PartEnum1 {
    B = 'B'
}

enum R7 {
    B = 'B',
    ...LiteralEnum1,
    A = 'A'
}

enum R8 {
    ...R8,
    R88 = 'R88'
}

enum R9 {
    ...R9,
    R9 = 'R9'
}


//// [spreadEnum7.js]
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
var R1;
(function (R1) {
    __assign(R1, LiteralEnum1);
    R1["R1"] = "R1";
})(R1 || (R1 = {}));
var LiteralEnum1;
(function (LiteralEnum1) {
    LiteralEnum1[LiteralEnum1["A"] = 0] = "A";
    LiteralEnum1[LiteralEnum1["B"] = 1] = "B";
})(LiteralEnum1 || (LiteralEnum1 = {}));
var R2;
(function (R2) {
    __assign(R2, R3);
    R2["R2"] = "R2";
})(R2 || (R2 = {}));
var R3;
(function (R3) {
    __assign(R3, R2);
    R3["R3"] = "R3";
})(R3 || (R3 = {}));
var R4;
(function (R4) {
    __assign(R4, LiteralEnum1);
    R4["R4"] = "R4";
})(R4 || (R4 = {}));
var R5;
(function (R5) {
    __assign(R5, LiteralEnum1);
    R5["R5"] = "R5";
})(R5 || (R5 = {}));
var R6;
(function (R6) {
    __assign(R6, LiteralEnum1);
    __assign(R6, R4);
    __assign(R6, R5);
    R6["R6"] = "R6";
})(R6 || (R6 = {}));
var PartEnum1;
(function (PartEnum1) {
    PartEnum1["A"] = "A";
})(PartEnum1 || (PartEnum1 = {}));
var RefEnum1;
(function (RefEnum1) {
    __assign(RefEnum1, PartEnum1);
    RefEnum1["R"] = "R";
})(RefEnum1 || (RefEnum1 = {}));
(function (PartEnum1) {
    PartEnum1["B"] = "B";
})(PartEnum1 || (PartEnum1 = {}));
var R7;
(function (R7) {
    R7["B"] = "B";
    __assign(R7, LiteralEnum1);
    R7["A"] = "A";
})(R7 || (R7 = {}));
var R8;
(function (R8) {
    __assign(R8, R8);
    R8["R88"] = "R88";
})(R8 || (R8 = {}));
var R9;
(function (R9) {
    __assign(R9, R9);
    R9["R9"] = "R9";
})(R9 || (R9 = {}));


//// [spreadEnum7.d.ts]
declare enum R1 {
    ...LiteralEnum1,
    R1 = "R1"
}
declare enum LiteralEnum1 {
    A = 0,
    B = 1
}
declare enum R2 {
    ...R3,
    R2 = "R2"
}
declare enum R3 {
    ...R2,
    R3 = "R3"
}
declare enum R4 {
    ...LiteralEnum1,
    R4 = "R4"
}
declare enum R5 {
    ...LiteralEnum1,
    R5 = "R5"
}
declare enum R6 {
    ...LiteralEnum1,
    ...R4,
    ...R5,
    R6 = "R6"
}
declare enum PartEnum1 {
    A = "A"
}
declare enum RefEnum1 {
    ...PartEnum1,
    R = "R"
}
declare enum PartEnum1 {
    B = "B"
}
declare enum R7 {
    B = "B",
    ...LiteralEnum1,
    A = "A"
}
declare enum R8 {
    ...R8,
    R88 = "R88"
}
declare enum R9 {
    ...R9,
    R9 = "R9"
}
