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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Op;
//// [test.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
const op_1 = __importDefault(require("./op"));
const po_1 = require("./po");
function foo() {
    return {
        [op_1.default.or]: [],
        [po_1.Po.ro]: {}
    };
}
