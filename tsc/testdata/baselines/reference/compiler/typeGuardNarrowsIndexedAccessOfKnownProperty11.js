//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty11.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty11.ts]
enum E { A, B }

declare const m: { [K in E]: string | null };

if (m[E.A] !== null) {
    m[E.A].toString(); // string
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty11.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
if (m[E.A] !== null) {
    m[E.A].toString(); // string
}
