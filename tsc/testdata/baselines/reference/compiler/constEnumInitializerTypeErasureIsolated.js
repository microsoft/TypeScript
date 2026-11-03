//// [tests/cases/compiler/constEnumInitializerTypeErasureIsolated.ts] ////

//// [constEnumInitializerTypeErasureIsolated.ts]
const enum E {
    A = 1,
    B = A + (1 as number),
}

export const value = E.A;


//// [constEnumInitializerTypeErasureIsolated.js]
var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = E.A + (1 as number)] = "B";
})(E || (E = {}));
export const value = E.A;
