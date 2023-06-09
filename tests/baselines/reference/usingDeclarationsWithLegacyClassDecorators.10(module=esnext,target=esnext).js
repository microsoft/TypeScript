//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.10.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.10.ts]
export {};

declare var dec: any;

@dec
export default class {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.10.js]
let default_1 = class {
};
default_1 = __decorate([
    dec
], default_1);
export default default_1;
using after = null;
