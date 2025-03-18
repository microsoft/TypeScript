//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.8.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.8.ts]
export {};

declare var dec: any;

@dec
export class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.8.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
@dec
class C {
}
exports.C = C;
using after = null;
