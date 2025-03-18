//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.9.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.9.ts]
export {};

declare var dec: any;

@dec
export default class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.9.js]
@dec
export default class C {
}
using after = null;
