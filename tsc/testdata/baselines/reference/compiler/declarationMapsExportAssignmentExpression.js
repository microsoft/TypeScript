//// [tests/cases/compiler/declarationMapsExportAssignmentExpression.ts] ////

//// [exportDefault.ts]
const b = 1;
const d = 2;
export default { b, d };

//// [exportEquals.ts]
const a = 1;
export = { a };

//// [exportEqualsClass.ts]
export = class {
    x = 1;
};

//// [exportDefaultArrow.ts]
export default (x: number) => x;


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
//// [exportEqualsClass.js]
"use strict";
module.exports = class {
    x = 1;
};
//// [exportDefaultArrow.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (x) => x;


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
//# sourceMappingURL=exportEquals.d.ts.map//// [exportEqualsClass.d.ts]
export = _default;
declare class _default {
    x: number;
}
//# sourceMappingURL=exportEqualsClass.d.ts.map//// [exportDefaultArrow.d.ts]
export default _default;
declare function _default(x: number): number;
//# sourceMappingURL=exportDefaultArrow.d.ts.map