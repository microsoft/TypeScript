//// [tests/cases/compiler/enumComputedNameSelfReferenceCrash.ts] ////

//// [enumComputedNameSelfReferenceCrash.ts]
// Computed enum member names are not allowed, but a computed name that refers back to a member of
// the same enum must not send the checker into infinite recursion while resolving the enum type.
// https://github.com/microsoft/TypeScript/issues/63173

declare const enum E {
    [object] = 1,
    A,
    object = 10,
}
E.A.toString();

const enum F {
    [F.A] = 1,
    A = 2,
}
F.A.toString();

enum G {
    [G.b] = 1,
    b = 2,
}
G.b;


//// [enumComputedNameSelfReferenceCrash.js]
"use strict";
// Computed enum member names are not allowed, but a computed name that refers back to a member of
// the same enum must not send the checker into infinite recursion while resolving the enum type.
// https://github.com/microsoft/TypeScript/issues/63173
2 /* E.A */.toString();
2 /* F.A */.toString();
var G;
(function (G) {
    G[G[G.b] = 1] = G.b;
    G[G["b"] = 2] = "b";
})(G || (G = {}));
G.b;


//// [enumComputedNameSelfReferenceCrash.d.ts]
declare const enum E {
    [object] = 1,
    A = 2,
    object = 10
}
declare const enum F {
    [F.A] = 1,
    A = 2
}
declare enum G {
    [G.b] = 1,
    b = 2
}
