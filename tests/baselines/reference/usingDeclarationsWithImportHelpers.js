//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithImportHelpers.ts] ////

//// [usingDeclarationsWithImportHelpers.ts]
export {};

{
    using a = null;
}

//// [usingDeclarationsWithImportHelpers.js]
import { __addDisposableResource, __disposeResources } from "tslib";
{
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const a = __addDisposableResource(env_1, null, false);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
