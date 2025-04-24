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
var before, _default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    before = __addDisposableResource(env_1, null, false);
    exports.default = _default = 
    @dec
    class {
        static { __setFunctionName(this, "default"); }
    };
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
