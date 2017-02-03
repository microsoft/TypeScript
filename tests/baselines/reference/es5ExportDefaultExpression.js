//// [es5ExportDefaultExpression.ts]

export default (1 + 2);


//// [es5ExportDefaultExpression.js]
"use strict";
exports.default = (1 + 2);
Object.defineProperty(exports, "__esModule", { value: true });


//// [es5ExportDefaultExpression.d.ts]
declare var _default: number;
export default _default;
