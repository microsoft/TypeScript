//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.2.ts] ////

//// [usingDeclarationsWithESClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithESClassDecorators.2.js]
var before, C;
export { C };
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    before = __addDisposableResource(env_1, null, false);
    C = 
    @dec
    class C {
    };
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
