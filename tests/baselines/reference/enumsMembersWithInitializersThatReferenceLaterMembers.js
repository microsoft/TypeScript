//// [enumsMembersWithInitializersThatReferenceLaterMembers.ts]
enum E1 {
    a = c,
    b = 2,
    c = 3,
}

declare enum E2 {
    a = c,
    b = 2,
    c = 3,
}

const enum E3 {
    a = c,
    b = 2,
    c = 3,
}

declare const enum E4 {
    a = c,
    b = 2,
    c = 3,
}

enum E5 {
    a = c,
    b,
    c,
}

declare enum E6 {
    a = c,
    b,
    c,
}

const enum E7 {
    a = c,
    b,
    c,
}

declare const enum E8 {
    a = c,
    b,
    c,
}

enum cycles {
    a = d,
    b = a,
    d,
    c,
    e = e
}


//// [enumsMembersWithInitializersThatReferenceLaterMembers.js]
var E1;
(function (E1) {
    E1["a"] = E1.c;
    E1[E1["b"] = 2] = "b";
    E1[E1["c"] = 3] = "c";
})(E1 || (E1 = {}));
var E5;
(function (E5) {
    E5["a"] = E5.c;
    E5[E5["b"] = 0] = "b";
    E5[E5["c"] = 1] = "c";
})(E5 || (E5 = {}));
var cycles;
(function (cycles) {
    cycles["a"] = cycles.d;
    cycles["b"] = cycles.a;
    cycles[cycles["d"] = 0] = "d";
    cycles[cycles["c"] = 1] = "c";
    cycles["e"] = cycles.e;
})(cycles || (cycles = {}));
