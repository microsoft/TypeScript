//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.12.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.12.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
let C = class C {
};
exports.D = C;
exports.D = C = __decorate([
    dec
], C);
var after;
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
