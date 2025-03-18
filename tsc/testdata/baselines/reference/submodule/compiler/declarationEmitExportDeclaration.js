//// [tests/cases/compiler/declarationEmitExportDeclaration.ts] ////

//// [utils.ts]
export function foo() { }
export function bar() { }
export interface Buzz { }

//// [index.ts]
import {foo, bar, Buzz} from "./utils";

foo();
let obj: Buzz;
export {bar};

//// [utils.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.bar = bar;
function foo() { }
function bar() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
const utils_1 = require("./utils");
Object.defineProperty(exports, "bar", { enumerable: true, get: function () { return utils_1.bar; } });
(0, utils_1.foo)();
let obj;
