//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.12.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.12.js]
let C = class C {
};
C = __decorate([
    dec
], C);
export { C as D };
using after = null;
