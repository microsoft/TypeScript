//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.4.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.4.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}


//// [usingDeclarationsWithLegacyClassDecorators.4.js]
var before, _default;
export { _default as default };
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    before = __addDisposableResource(env_1, null, false);
    _default = 
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
