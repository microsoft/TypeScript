//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.5.ts] ////

//// [usingDeclarationsWithESClassDecorators.5.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C };

//// [usingDeclarationsWithESClassDecorators.5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
using before = null;
@dec
class C {
}
exports.C = C;
