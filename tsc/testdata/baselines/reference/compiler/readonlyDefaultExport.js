//// [tests/cases/compiler/readonlyDefaultExport.ts] ////

//// [a.ts]
const foo = {
  a: 1
}

export default foo as Readonly<typeof foo>

//// [b.ts]
import foo from './a'

foo.a = 2


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = {
    a: 1
};
exports.default = foo;
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
a_1.default.a = 2;
