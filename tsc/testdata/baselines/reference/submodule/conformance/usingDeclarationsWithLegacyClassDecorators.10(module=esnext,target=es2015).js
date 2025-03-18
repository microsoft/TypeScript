//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.10.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.10.ts]
export {};

declare var dec: any;

@dec
export default class {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.10.js]
@dec
export default class {
}
using after = null;
