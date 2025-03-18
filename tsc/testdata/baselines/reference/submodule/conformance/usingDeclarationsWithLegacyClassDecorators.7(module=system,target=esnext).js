//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.7.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.7.ts]
export {};

declare var dec: any;

@dec
class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
@dec
class C {
}
using after = null;
