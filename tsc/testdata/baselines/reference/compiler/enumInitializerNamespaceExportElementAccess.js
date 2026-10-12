//// [tests/cases/compiler/enumInitializerNamespaceExportElementAccess.ts] ////

//// [enumInitializerNamespaceExportElementAccess.ts]
// Namespace export merged with enum must not be treated as an enum member via E["C"].
// Previously panicked: Unhandled case in Node.MemberList: KindModuleBlock

namespace E {
    export class C {}
}
enum E {
    D = E["C"],
}

// Alias exports that resolve to enum members must still constant-evaluate (like E.C).
enum F {
    A = 1,
}
namespace E2 {
    export import C = F.A;
}
enum E2 {
    D = E2["C"],
    Next,
}


//// [enumInitializerNamespaceExportElementAccess.js]
"use strict";
// Namespace export merged with enum must not be treated as an enum member via E["C"].
// Previously panicked: Unhandled case in Node.MemberList: KindModuleBlock
var E;
(function (E) {
    class C {
    }
    E.C = C;
})(E || (E = {}));
(function (E) {
    E[E["D"] = E["C"]] = "D";
})(E || (E = {}));
// Alias exports that resolve to enum members must still constant-evaluate (like E.C).
var F;
(function (F) {
    F[F["A"] = 1] = "A";
})(F || (F = {}));
var E2;
(function (E2) {
    E2.C = F.A;
})(E2 || (E2 = {}));
(function (E2) {
    E2[E2["D"] = 1] = "D";
    E2[E2["Next"] = 2] = "Next";
})(E2 || (E2 = {}));
