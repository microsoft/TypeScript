//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment3.ts] ////

//// [checkJsdocTypeTagOnExportAssignment3.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */

const bar = { c: 1 };

/** @type {Foo} */
export default bar;

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment3.js]
//// [a.js]
"use strict";
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */
Object.defineProperty(exports, "__esModule", { value: true });
const bar = { c: 1 };
/** @type {Foo} */
exports.default = bar;
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
a_1.default;
