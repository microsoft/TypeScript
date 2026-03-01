//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.6.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.6.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C as D };

//// [usingDeclarationsWithLegacyClassDecorators.6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
using before = null;
let C = class C {
};
exports.D = C;
exports.D = C = __decorate([
    dec
], C);
