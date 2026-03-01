//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.11.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.11.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C };

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.11.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
let C = class C {
};
exports.C = C;
exports.C = C = __decorate([
    dec
], C);
using after = null;
