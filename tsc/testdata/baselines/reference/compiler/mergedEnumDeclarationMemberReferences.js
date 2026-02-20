//// [tests/cases/compiler/mergedEnumDeclarationMemberReferences.ts] ////

//// [mergedEnumDeclarationMemberReferences.ts]
// Unqualified enum member references across merged enum declarations
enum E {
    A = 0,
    B = 1,
}

enum E {
    C = A,
    D = B + 1,
}


//// [mergedEnumDeclarationMemberReferences.js]
"use strict";
// Unqualified enum member references across merged enum declarations
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
(function (E) {
    E["C"] = E.A;
    if (typeof E.C !== "string") E[E.C] = "C";
    E["D"] = E.B + 1;
    if (typeof E.D !== "string") E[E.D] = "D";
})(E || (E = {}));
