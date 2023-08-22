//// [tests/cases/compiler/exportDeclarationForModuleOrEnumWithMemberOfSameName.ts] ////

//// [exportDeclarationForModuleOrEnumWithMemberOfSameName.ts]
// https://github.com/microsoft/TypeScript/issues/55038

namespace A {
    export const A = 0;
}

export { A }

enum B {
    B
}

export { B }


//// [exportDeclarationForModuleOrEnumWithMemberOfSameName.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/55038
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
var A;
(function (A_1) {
    A_1.A = 0;
})(A || (exports.A = A = {}));
var B;
(function (B) {
    B[B["B"] = 0] = "B";
})(B || (exports.B = B = {}));
