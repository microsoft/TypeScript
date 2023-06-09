//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.3.ts] ////

//// [usingDeclarationsWithESClassDecorators.3.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class C {
}

void C;

//// [usingDeclarationsWithESClassDecorators.3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
using before = null;
@dec
class C {
}
exports.default = C;
void C;
