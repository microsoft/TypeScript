//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment5.ts] ////

//// [checkJsdocTypeTagOnExportAssignment5.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */

/** @type {Foo} */
export default { a: 1, b: 1 };

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment5.js]
//// [a.js]
"use strict";
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {Foo} */
exports.default = { a: 1, b: 1 };
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
a_1.default;
