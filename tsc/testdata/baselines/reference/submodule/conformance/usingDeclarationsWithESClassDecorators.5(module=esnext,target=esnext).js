//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.5.ts] ////

//// [usingDeclarationsWithESClassDecorators.5.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C };

//// [usingDeclarationsWithESClassDecorators.5.js]
using before = null;
@dec
class C {
}
export { C };
