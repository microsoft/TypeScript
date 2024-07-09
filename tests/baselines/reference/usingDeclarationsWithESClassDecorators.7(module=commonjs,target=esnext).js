//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.7.ts] ////

//// [usingDeclarationsWithESClassDecorators.7.ts]
export {};

declare var dec: any;

@dec
class C {
}

using after = null;



//// [usingDeclarationsWithESClassDecorators.7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
@dec
class C {
}
using after = null;
