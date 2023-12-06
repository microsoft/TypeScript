//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.2.ts] ////

//// [usingDeclarationsWithESClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithESClassDecorators.2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
using before = null;
@dec
class C {
}
exports.C = C;
