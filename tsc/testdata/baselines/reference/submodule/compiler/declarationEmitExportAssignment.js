//// [tests/cases/compiler/declarationEmitExportAssignment.ts] ////

//// [utils.ts]
export function foo() { }
export function bar() { }
export interface Buzz { }

//// [index.ts]
import {foo} from "./utils";
export = foo;

//// [utils.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.bar = bar;
function foo() { }
function bar() { }
//// [index.js]
"use strict";
const utils_1 = require("./utils");
module.exports = foo;
