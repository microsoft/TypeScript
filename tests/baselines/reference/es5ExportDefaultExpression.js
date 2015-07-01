//// [es5ExportDefaultExpression.ts]

export default (1 + 2);


//// [es5ExportDefaultExpression.js]
exports.default = (1 + 2);


//// [es5ExportDefaultExpression.d.ts]
declare var _default: number;
export default _default;
