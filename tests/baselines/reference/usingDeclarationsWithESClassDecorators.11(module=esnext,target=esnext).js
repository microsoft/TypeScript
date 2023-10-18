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
@dec
class C {
}
export { C };
using after = null;
