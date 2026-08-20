//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.12.ts] ////

//// [usingDeclarationsWithESClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithESClassDecorators.12.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
@dec
class C {
}
exports.D = C;
using after = null;
