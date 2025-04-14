//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.6.ts] ////

//// [usingDeclarationsWithESClassDecorators.6.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C as D };

//// [usingDeclarationsWithESClassDecorators.6.js]
using before = null;
@dec
class C {
}
export { C as D };
