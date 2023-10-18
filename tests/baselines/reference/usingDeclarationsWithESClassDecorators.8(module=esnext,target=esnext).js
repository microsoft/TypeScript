//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.8.ts] ////

//// [usingDeclarationsWithESClassDecorators.8.ts]
export {};

declare var dec: any;

@dec
export class C {
}

using after = null;


//// [usingDeclarationsWithESClassDecorators.8.js]
@dec
export class C {
}
using after = null;
