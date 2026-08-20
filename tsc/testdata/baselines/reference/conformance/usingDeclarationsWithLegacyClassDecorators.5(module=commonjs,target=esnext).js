//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.5.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.5.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C };

//// [usingDeclarationsWithLegacyClassDecorators.5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
using before = null;
let C = class C {
};
exports.C = C;
exports.C = C = __decorate([
    dec
], C);
