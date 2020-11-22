//// [tests/cases/compiler/uniqueSymbolPropertyDeclarationEmit.ts] ////

//// [test.ts]
import Op from './op';
import { Po } from './po';

export default function foo() {
  return {
    [Op.or]: [],
    [Po.ro]: {}
  };
}

//// [op.ts]
declare const Op: {
  readonly or: unique symbol;
};

export default Op;

//// [po.d.ts]
export declare const Po: {
  readonly ro: unique symbol;
};


//// [op.js]
"use strict";
exports.__esModule = true;
exports["default"] = Op;
//// [test.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var op_1 = __importDefault(require("./op"));
var po_1 = require("./po");
function foo() {
    var _a;
    return _a = {},
        _a[op_1["default"].or] = [],
        _a[po_1.Po.ro] = {},
        _a;
}
exports["default"] = foo;


//// [op.d.ts]
declare const Op: {
    readonly or: unique symbol;
};
export default Op;
//// [test.d.ts]
import Op from './op';
import { Po } from './po';
export default function foo(): {
    [Op.or]: any[];
    [Po.ro]: {};
};
