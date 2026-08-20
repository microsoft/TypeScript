//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.1.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.1.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}


//// [usingDeclarationsWithLegacyClassDecorators.1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
using before = null;
let C = class C {
};
C = __decorate([
    dec
], C);
