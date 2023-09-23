//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.2.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithLegacyClassDecorators.2.js]
using before = null;
let C = class C {
};
C = __decorate([
    dec
], C);
export { C };
