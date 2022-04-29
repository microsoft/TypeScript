//// [tests/cases/compiler/globalThisDeclarationEmit3.ts] ////

//// [index.ts]
import { variable } from "./variable";
export { variable as globalThis };

//// [variable.ts]
import mod = globalThis;
export { mod as variable };

//// [variable.js]
"use strict";
exports.__esModule = true;
exports.variable = void 0;
var mod = globalThis;
exports.variable = mod;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.globalThis = void 0;
var variable_1 = require("./variable");
exports.globalThis = variable_1.variable;


//// [variable.d.ts]
import mod = globalThis;
export { mod as variable };
//// [index.d.ts]
import { variable } from "./variable";
export { variable as globalThis };
