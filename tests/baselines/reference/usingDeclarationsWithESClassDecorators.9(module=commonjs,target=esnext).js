//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.9.ts] ////

//// [usingDeclarationsWithESClassDecorators.9.ts]
export {};

declare var dec: any;

@dec
export default class C {
}

void C;

using after = null;



//// [usingDeclarationsWithESClassDecorators.9.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
@dec
class C {
}
exports.default = C;
void C;
using after = null;
