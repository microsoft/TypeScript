//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.7.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.7.ts]
export {};

declare var dec: any;

@dec
class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.7.js]
let C = class C {
};
C = __decorate([
    dec
], C);
using after = null;
export {};
