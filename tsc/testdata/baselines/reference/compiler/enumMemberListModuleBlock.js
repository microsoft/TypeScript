//// [tests/cases/compiler/enumMemberListModuleBlock.ts] ////

//// [enumMemberListModuleBlock.ts]
namespace E { export class C {} }
enum E { D = E["C"] }


//// [enumMemberListModuleBlock.js]
"use strict";
var E;
(function (E) {
    class C {
    }
    E.C = C;
})(E || (E = {}));
(function (E) {
    E[E["D"] = E["C"]] = "D";
})(E || (E = {}));
