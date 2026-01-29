//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment7.ts] ////

//// [checkJsdocTypeTagOnExportAssignment7.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */

const abc = { a: 1, b: 1, c: 1 };

/** @type {Foo} */
export default abc;

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment7.js]
//// [a.js]
"use strict";
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */
Object.defineProperty(exports, "__esModule", { value: true });
const abc = { a: 1, b: 1, c: 1 };
/** @type {Foo} */
exports.default = abc;
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
a_1.default;
