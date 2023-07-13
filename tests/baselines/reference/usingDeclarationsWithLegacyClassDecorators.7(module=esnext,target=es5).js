//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.7.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.7.ts]
export {};

declare var dec: any;

@dec
class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.7.js]
var C = /** @class */ (function () {
    function C() {
    }
    C = __decorate([
        dec
    ], C);
    return C;
}());
var after;
var env_1 = { stack: [], error: void 0, hasError: false };
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
export {};
