//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.4.ts] ////

//// [usingDeclarationsWithESClassDecorators.4.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}


//// [usingDeclarationsWithESClassDecorators.4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
using before = null;
@dec
class default_1 {
}
exports.default = default_1;
