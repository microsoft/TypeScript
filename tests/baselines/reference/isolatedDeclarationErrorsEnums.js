//// [tests/cases/compiler/isolatedDeclarationErrorsEnums.ts] ////

//// [isolatedDeclarationErrorsEnums.ts]
declare function computed(x: number): number;

enum E {
    A = computed(0),
    B = computed(1),
    C = computed(2),
    D = computed(3),
}


enum F {
    A = E.A,
    B = A,
}


enum Flag {
    A = 1 >> 1,
    B = 2 >> 2,
    C = 3 >> 2,
    AB = A | B,
    ABC = Flag.AB | C,
    AC = Flag["A"] | C,
}

const EV = 1;
enum ExtFlags {
    D = 4 >> 1,
    E = EV,
    ABCD = Flag.ABC | D,
    AC = Flag["A"] | D,
}


enum Str {
    A = "A",
    B = "B",
    AB = A + B
}


enum StrExt {
    D = "D",
    ABD = Str.AB + D,
    AD = Str["A"] + D,
}

//// [isolatedDeclarationErrorsEnums.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = computed(0)] = "A";
    E[E["B"] = computed(1)] = "B";
    E[E["C"] = computed(2)] = "C";
    E[E["D"] = computed(3)] = "D";
})(E || (E = {}));
var F;
(function (F) {
    F[F["A"] = E.A] = "A";
    F[F["B"] = F.A] = "B";
})(F || (F = {}));
var Flag;
(function (Flag) {
    Flag[Flag["A"] = 0] = "A";
    Flag[Flag["B"] = 0] = "B";
    Flag[Flag["C"] = 0] = "C";
    Flag[Flag["AB"] = 0] = "AB";
    Flag[Flag["ABC"] = 0] = "ABC";
    Flag[Flag["AC"] = 0] = "AC";
})(Flag || (Flag = {}));
const EV = 1;
var ExtFlags;
(function (ExtFlags) {
    ExtFlags[ExtFlags["D"] = 2] = "D";
    ExtFlags[ExtFlags["E"] = 1] = "E";
    ExtFlags[ExtFlags["ABCD"] = 2] = "ABCD";
    ExtFlags[ExtFlags["AC"] = 2] = "AC";
})(ExtFlags || (ExtFlags = {}));
var Str;
(function (Str) {
    Str["A"] = "A";
    Str["B"] = "B";
    Str["AB"] = "AB";
})(Str || (Str = {}));
var StrExt;
(function (StrExt) {
    StrExt["D"] = "D";
    StrExt["ABD"] = "ABD";
    StrExt["AD"] = "AD";
})(StrExt || (StrExt = {}));
