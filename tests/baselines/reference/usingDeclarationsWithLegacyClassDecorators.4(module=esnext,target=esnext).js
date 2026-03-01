//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.4.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.4.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}


//// [usingDeclarationsWithLegacyClassDecorators.4.js]
using before = null;
let default_1 = class {
};
default_1 = __decorate([
    dec
], default_1);
export default default_1;
