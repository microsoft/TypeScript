//// [tests/cases/compiler/declarationMapsExportAssignmentExpression.ts] ////

//// [exportDefault.ts]
const b = 1;
const d = 2;
export default { b, d };

//// [exportEquals.ts]
const a = 1;
export = { a };


//// [exportDefault.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b = 1;
const d = 2;
exports.default = { b, d };
//// [exportEquals.js]
"use strict";
const a = 1;
module.exports = { a };


//// [exportDefault.d.ts]
declare const _default: {
    b: number;
    d: number;
};
export default _default;
//# sourceMappingURL=exportDefault.d.ts.map//// [exportEquals.d.ts]
declare const _default: {
    a: number;
};
export = _default;
//# sourceMappingURL=exportEquals.d.ts.map