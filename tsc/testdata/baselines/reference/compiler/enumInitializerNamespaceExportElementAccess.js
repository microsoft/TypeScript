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
