//// [tests/cases/compiler/declarationEmitExpressionInExtends7.ts] ////

//// [declarationEmitExpressionInExtends7.ts]
export default class extends SomeUndefinedFunction {}


//// [declarationEmitExpressionInExtends7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 extends SomeUndefinedFunction {
}
exports.default = default_1;
