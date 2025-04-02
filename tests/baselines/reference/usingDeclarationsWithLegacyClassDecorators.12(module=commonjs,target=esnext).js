//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.12.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.12.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
let C = class C {
};
exports.D = C;
exports.D = C = __decorate([
    dec
], C);
using after = null;
