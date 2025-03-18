//// [tests/cases/compiler/systemModuleDeclarationMerging.ts] ////

//// [systemModuleDeclarationMerging.ts]
export function F() {}
export module F { var x; }

export class C {}
export module C { var x; }

export enum E {}
export module E { var x; }

//// [systemModuleDeclarationMerging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = exports.C = void 0;
exports.F = F;
function F() { }
(function (F) {
    var x;
})(F || (exports.F = F = {}));
class C {
}
exports.C = C;
(function (C) {
    var x;
})(C || (exports.C = C = {}));
var E;
(function (E) {
})(E || (exports.E = E = {}));
(function (E) {
    var x;
})(E || (exports.E = E = {}));
