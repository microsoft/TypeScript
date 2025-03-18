//// [tests/cases/compiler/globalThisDeclarationEmit3.ts] ////

//// [index.ts]
import { variable } from "./variable";
export { variable as globalThis };

//// [variable.ts]
import mod = globalThis;
export { mod as variable };

//// [variable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variable = void 0;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalThis = void 0;
const variable_1 = require("./variable");
Object.defineProperty(exports, "globalThis", { enumerable: true, get: function () { return variable_1.variable; } });
