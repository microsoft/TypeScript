//// [spreadEnum4.ts]
enum LiteralEnum1 {
    A,
    B,
    C
}

const enum ConstEnum {
    A = 'A',
    B = 'B'
}

enum R1 {
    ...ConstEnum,
    R1 = 'R1'
}

const enum R2 {
    ...LiteralEnum1,
    R2 = 'R2'
}


//// [spreadEnum4.js]
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
var ConstEnum;
(function (ConstEnum) {
    ConstEnum["A"] = "A";
    ConstEnum["B"] = "B";
})(ConstEnum || (ConstEnum = {}));
var R1;
(function (R1) {
    __assign(R1, ConstEnum);
    R1["R1"] = "R1";
})(R1 || (R1 = {}));
var R2;
(function (R2) {
    __assign(R2, LiteralEnum1);
    R2["R2"] = "R2";
})(R2 || (R2 = {}));


//// [spreadEnum4.d.ts]
declare enum LiteralEnum1 {
    A = 0,
    B = 1,
    C = 2
}
declare const enum ConstEnum {
    A = "A",
    B = "B"
}
declare enum R1 {
    ...ConstEnum,
    R1 = "R1"
}
declare const enum R2 {
    ...LiteralEnum1,
    R2 = "R2"
}
