//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.9.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.9.ts]
export {};

declare var dec: any;

@dec
export default class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.9.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let C = class C {
};
C = __decorate([
    dec
], C);
exports.default = C;
using after = null;
