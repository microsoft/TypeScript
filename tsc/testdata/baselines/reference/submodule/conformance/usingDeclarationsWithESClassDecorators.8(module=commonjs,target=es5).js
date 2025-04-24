//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.8.ts] ////

//// [usingDeclarationsWithESClassDecorators.8.ts]
export {};

declare var dec: any;

@dec
export class C {
}

using after = null;


//// [usingDeclarationsWithESClassDecorators.8.js]
"use strict";
var after;
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
@dec
class C {
}
exports.C = C;
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
