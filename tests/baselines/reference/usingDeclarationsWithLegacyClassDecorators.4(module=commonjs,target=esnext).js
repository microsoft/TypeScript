//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.4.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.4.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}


//// [usingDeclarationsWithLegacyClassDecorators.4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
using before = null;
let default_1 = class {
};
default_1 = __decorate([
    dec
], default_1);
exports.default = default_1;
