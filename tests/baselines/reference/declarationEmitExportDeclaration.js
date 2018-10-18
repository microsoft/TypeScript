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
function foo() { }
exports.foo = foo;
function bar() { }
exports.bar = bar;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.bar = utils_1.bar;
utils_1.foo();
var obj;


//// [utils.d.ts]
export declare function foo(): void;
export declare function bar(): void;
export interface Buzz {
}
//// [index.d.ts]
import { bar } from "./utils";
export { bar };
