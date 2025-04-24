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
var after;
Object.defineProperty(exports, "__esModule", { value: true });
@dec
class C {
}
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    after = __addDisposableResource(env_1, null, false);
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
