//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.11.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.11.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C };

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.11.js]
let C = class C {
};
C = __decorate([
    dec
], C);
export { C };
using after = null;
