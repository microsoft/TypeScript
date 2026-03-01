//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsWithImportHelpers.ts] ////

//// [awaitUsingDeclarationsWithImportHelpers.ts]
export {};

async function f() {
    await using a = null;
}

//// [awaitUsingDeclarationsWithImportHelpers.js]
import { __addDisposableResource, __disposeResources } from "tslib";
async function f() {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const a = __addDisposableResource(env_1, null, true);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        const result_1 = __disposeResources(env_1);
        if (result_1)
            await result_1;
    }
}
