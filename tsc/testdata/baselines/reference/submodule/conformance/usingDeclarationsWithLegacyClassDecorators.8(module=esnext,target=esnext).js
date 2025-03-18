//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.8.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.8.ts]
export {};

declare var dec: any;

@dec
export class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.8.js]
@dec
export class C {
}
using after = null;
