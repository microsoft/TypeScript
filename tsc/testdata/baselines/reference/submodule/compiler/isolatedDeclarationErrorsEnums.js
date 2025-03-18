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
var E;
(function (E) {
    E["A"] = computed(0);
    if (typeof E.A !== "string") E[E.A] = "A";
    E["B"] = computed(1);
    if (typeof E.B !== "string") E[E.B] = "B";
    E["C"] = computed(2);
    if (typeof E.C !== "string") E[E.C] = "C";
    E["D"] = computed(3);
    if (typeof E.D !== "string") E[E.D] = "D";
})(E || (E = {}));
var F;
(function (F) {
    F["A"] = E.A;
    if (typeof F.A !== "string") F[F.A] = "A";
    F["B"] = F.A;
    if (typeof F.B !== "string") F[F.B] = "B";
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
    ExtFlags["E"] = EV;
    if (typeof ExtFlags.E !== "string") ExtFlags[ExtFlags.E] = "E";
    ExtFlags["ABCD"] = Flag.ABC | ExtFlags.D;
    if (typeof ExtFlags.ABCD !== "string") ExtFlags[ExtFlags.ABCD] = "ABCD";
    ExtFlags["AC"] = Flag["A"] | ExtFlags.D;
    if (typeof ExtFlags.AC !== "string") ExtFlags[ExtFlags.AC] = "AC";
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
    StrExt["ABD"] = Str.AB + StrExt.D;
    if (typeof StrExt.ABD !== "string") StrExt[StrExt.ABD] = "ABD";
    StrExt["AD"] = Str["A"] + StrExt.D;
    if (typeof StrExt.AD !== "string") StrExt[StrExt.AD] = "AD";
})(StrExt || (StrExt = {}));
