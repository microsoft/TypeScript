//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment2.ts] ////

//// [checkJsdocTypeTagOnExportAssignment2.js]

//// [a.ts]
export interface Foo {
    a: number;
    b: number;
}

//// [b.js]
/** @type {import("./a").Foo} */
export default { c: false };

//// [c.js]
import b from "./b";
b;


//// [checkJsdocTypeTagOnExportAssignment2.js]
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import("./a").Foo} */
exports.default = { c: false };
//// [c.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = __importDefault(require("./b"));
b_1.default;
