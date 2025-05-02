//// [tests/cases/compiler/duplicateObjectLiteralProperty_computedName2.ts] ////

//// [duplicateObjectLiteralProperty_computedName2.ts]
const n = 1;
const s = "s";
enum E1 { A = "ENUM_KEY" }
enum E2 { B }

const t1 = {
    [n]: 1,
    [n]: 1, // duplicate
}

const t2 = {
    [s]: 1,
    [s]: 1, // duplicate
}

const t3 = {
    [E1.A]: 1,
    [E1.A]: 1, // duplicate
}

const t4 = {
    [E2.B]: 1,
    [E2.B]: 1, // duplicate
}


//// [duplicateObjectLiteralProperty_computedName2.js]
var _a, _b, _c, _d;
var n = 1;
var s = "s";
var E1;
(function (E1) {
    E1["A"] = "ENUM_KEY";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["B"] = 0] = "B";
})(E2 || (E2 = {}));
var t1 = (_a = {},
    _a[n] = 1,
    _a[n] = 1,
    _a);
var t2 = (_b = {},
    _b[s] = 1,
    _b[s] = 1,
    _b);
var t3 = (_c = {},
    _c[E1.A] = 1,
    _c[E1.A] = 1,
    _c);
var t4 = (_d = {},
    _d[E2.B] = 1,
    _d[E2.B] = 1,
    _d);
