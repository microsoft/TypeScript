//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.2.ts] ////

//// [usingDeclarationsWithESClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithESClassDecorators.2.js]
using before = null;
@dec
export class C {
}
