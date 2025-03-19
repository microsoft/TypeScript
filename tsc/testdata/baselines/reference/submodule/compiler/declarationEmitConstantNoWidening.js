//// [tests/cases/compiler/declarationEmitConstantNoWidening.ts] ////

//// [declarationEmitConstantNoWidening.ts]
export const FOO = 'FOO'; 
export class Bar {
    readonly type = FOO; // Should be widening literal "FOO" - so either `typeof "FOO"` or = "FOO"
}

//// [declarationEmitConstantNoWidening.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = exports.FOO = void 0;
exports.FOO = 'FOO';
class Bar {
    type = exports.FOO; // Should be widening literal "FOO" - so either `typeof "FOO"` or = "FOO"
}
exports.Bar = Bar;
