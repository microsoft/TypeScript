//// [tests/cases/compiler/globalThisDeclarationEmit2.ts] ////

//// [index.ts]
import { variable } from "./variable";
export { variable as globalThis };

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
Object.defineProperty(exports, "globalThis", { enumerable: true, get: function () { return variable_1.variable; } });


//// [variable.d.ts]
export declare const variable: typeof globalThis;
//// [index.d.ts]
import { variable } from "./variable";
export { variable as globalThis };
