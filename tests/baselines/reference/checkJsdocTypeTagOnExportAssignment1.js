//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment1.ts] ////

//// [checkJsdocTypeTagOnExportAssignment1.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */

/** @type {Foo} */
export default { c: false };

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment1.js]
//// [a.js]
"use strict";
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {Foo} */
exports.default = { c: false };
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
a_1.default;
