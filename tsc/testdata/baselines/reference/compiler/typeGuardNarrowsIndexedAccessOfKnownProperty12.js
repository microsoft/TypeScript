//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty12.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty12.ts]
enum E {
    A = "A",
    B = "B"
}

declare const m: { [K in E]: string | null };

if (m[E.A] !== null) {
    m[E.A].toString(); // string
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty12.js]
"use strict";
var E;
(function (E) {
    E["A"] = "A";
    E["B"] = "B";
})(E || (E = {}));
if (m[E.A] !== null) {
    m[E.A].toString(); // string
}
