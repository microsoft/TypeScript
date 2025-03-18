//// [tests/cases/compiler/typeReferenceDirectives8.ts] ////

//// [index.d.ts]
interface Lib { x }

//// [mod1.ts]
export function foo(): Lib { return {x: 1} }

//// [mod2.ts]
import {foo} from "./mod1";
export const bar = foo();

//// [mod1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { return { x: 1 }; }
//// [mod2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
const mod1_1 = require("./mod1");
exports.bar = (0, mod1_1.foo)();
