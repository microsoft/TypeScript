//// [tests/cases/compiler/globalThisDeclarationEmit.ts] ////

//// [index.ts]
import { variable } from "./variable";
export const globalThis = variable;

//// [variable.ts]
export const variable = globalThis;

//// [variable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variable = void 0;
exports.variable = globalThis;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalThis = void 0;
var variable_1 = require("./variable");
exports.globalThis = variable_1.variable;


//// [variable.d.ts]
export declare const variable: typeof globalThis;
