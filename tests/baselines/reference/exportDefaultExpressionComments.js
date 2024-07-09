//// [tests/cases/conformance/declarationEmit/exportDefaultExpressionComments.ts] ////

//// [exportDefaultExpressionComments.ts]
/**
 * JSDoc Comments
 */
export default null


//// [exportDefaultExpressionComments.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * JSDoc Comments
 */
exports.default = null;


//// [exportDefaultExpressionComments.d.ts]
/**
 * JSDoc Comments
 */
declare const _default: any;
export default _default;
