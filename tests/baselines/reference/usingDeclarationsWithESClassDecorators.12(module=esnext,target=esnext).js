//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.12.ts] ////

//// [usingDeclarationsWithESClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithESClassDecorators.12.js]
@dec
class C {
}
export { C as D };
using after = null;
