//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.9.ts] ////

//// [usingDeclarationsWithESClassDecorators.9.ts]
export {};

declare var dec: any;

@dec
export default class C {
}

void C;

using after = null;



//// [usingDeclarationsWithESClassDecorators.9.js]
var after;
@dec
export default class C {
}
void C;
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
