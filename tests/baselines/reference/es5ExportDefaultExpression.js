//// [tests/cases/compiler/es5ExportDefaultExpression.ts] ////

//// [es5ExportDefaultExpression.ts]
export default (1 + 2);


//// [es5ExportDefaultExpression.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (1 + 2);


//// [es5ExportDefaultExpression.d.ts]
declare const _default: number;
export default _default;
