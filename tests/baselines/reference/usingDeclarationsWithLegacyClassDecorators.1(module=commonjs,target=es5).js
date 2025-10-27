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
var before, C;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    before = __addDisposableResource(env_1, null, false);
    C = class C {
    };
    C = __decorate([
        dec
    ], C);
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
