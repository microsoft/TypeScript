//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.10.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.10.ts]
export {};

declare var dec: any;

@dec
export default class {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.10.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let default_1 = class {
};
default_1 = __decorate([
    dec
], default_1);
exports.default = default_1;
using after = null;
