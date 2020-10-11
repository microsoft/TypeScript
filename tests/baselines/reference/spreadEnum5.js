//// [spreadEnum5.ts]
enum LiteralEnum1 {
    A,
    B
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

const enum R3 {
    ...ConstEnum,
    R3 = 'R3'
}

LiteralEnum1.A;
LiteralEnum1.B;
ConstEnum.A;
ConstEnum.B;
R1.A;
R1.B;
R1.R1;
R2.A;
R2.B;
R2.R2;
R3.A;
R3.B;
R3.R3;


//// [spreadEnum5.js]
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
var R1;
(function (R1) {
    __assign(R1, ConstEnum);
    R1["R1"] = "R1";
})(R1 || (R1 = {}));
LiteralEnum1.A;
LiteralEnum1.B;
"A" /* A */;
"B" /* B */;
"A" /* A */;
"B" /* B */;
R1.R1;
R2.A;
R2.B;
"R2" /* R2 */;
"A" /* A */;
"B" /* B */;
"R3" /* R3 */;


//// [spreadEnum5.d.ts]
declare enum LiteralEnum1 {
    A = 0,
    B = 1
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
declare const enum R3 {
    ...ConstEnum,
    R3 = "R3"
}
