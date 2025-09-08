//// [tests/cases/conformance/declarationEmit/exportDefaultExpressionComments.ts] ////

//// [exportDefaultExpressionComments.ts]
/**
 * JSDoc Comments
 */
export default null


//// [exportDefaultExpressionComments.js]
/**
 * JSDoc Comments
 */
export default null;


//// [exportDefaultExpressionComments.d.ts]
/**
 * JSDoc Comments
 */
declare const _default: any;
export default _default;
