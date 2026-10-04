//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.5.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.5.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C };

//// [usingDeclarationsWithLegacyClassDecorators.5.js]
using before = null;
let C = class C {
};
C = __decorate([
    dec
], C);
export { C };
