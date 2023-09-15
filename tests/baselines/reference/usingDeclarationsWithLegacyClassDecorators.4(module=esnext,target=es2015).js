//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.4.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.4.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}


//// [usingDeclarationsWithLegacyClassDecorators.4.js]
export { _default as default };
var before, default_1, _default;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    before = __addDisposableResource(env_1, null, false);
    default_1 = class {
    };
    default_1 = __decorate([
        dec
    ], default_1);
    _default = default_1;
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
