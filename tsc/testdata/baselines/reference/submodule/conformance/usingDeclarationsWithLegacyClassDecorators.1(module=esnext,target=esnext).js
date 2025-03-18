//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.1.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.1.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}


//// [usingDeclarationsWithLegacyClassDecorators.1.js]
using before = null;
@dec
class C {
}
export {};
