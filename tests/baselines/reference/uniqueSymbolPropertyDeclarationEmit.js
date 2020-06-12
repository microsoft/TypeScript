//// [tests/cases/compiler/uniqueSymbolPropertyDeclarationEmit.ts] ////

//// [test.ts]
import Op from './op';

export default function foo() {
  return {
    [Op.or]: [],
  };
}

//// [op.ts]
declare const Op: {
  readonly or: unique symbol;
};

export default Op;


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
function foo() {
    var _a;
    return _a = {},
        _a[op_1["default"].or] = [],
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
export default function foo(): {
    [Op.or]: any[];
};
