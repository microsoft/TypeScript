//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.11.ts] ////

//// [usingDeclarationsWithESClassDecorators.11.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C };

using after = null;


//// [usingDeclarationsWithESClassDecorators.11.js]
var after;
@dec
class C {
}
export { C };
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
