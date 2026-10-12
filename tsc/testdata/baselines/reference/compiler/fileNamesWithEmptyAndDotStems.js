//// [tests/cases/compiler/fileNamesWithEmptyAndDotStems.ts] ////

//// [.ts]
export const empty = 1;

//// [..ts]
export const dot = 2;

//// [...ts]
export const parent = 3;

//// [.d.ts]
export declare const declared: number;

//// [main.ts]
import { declared } from "./decl/.js";
export { empty } from "./empty/.js";
export { dot } from "./dot/..js";
export { parent } from "./parent/...js";
export const fromDeclaration = declared;


//// [.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = void 0;
exports.empty = 1;
//// [..js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dot = void 0;
exports.dot = 2;
//// [...js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parent = void 0;
exports.parent = 3;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromDeclaration = exports.parent = exports.dot = exports.empty = void 0;
const _js_1 = require("./decl/.js");
var _js_2 = require("./empty/.js");
Object.defineProperty(exports, "empty", { enumerable: true, get: function () { return _js_2.empty; } });
var __js_1 = require("./dot/..js");
Object.defineProperty(exports, "dot", { enumerable: true, get: function () { return __js_1.dot; } });
var ___js_1 = require("./parent/...js");
Object.defineProperty(exports, "parent", { enumerable: true, get: function () { return ___js_1.parent; } });
exports.fromDeclaration = _js_1.declared;


//// [.d.ts]
export declare const empty = 1;
//// [..d.ts]
export declare const dot = 2;
//// [...d.ts]
export declare const parent = 3;
//// [main.d.ts]
export { empty } from "./empty/.js";
export { dot } from "./dot/..js";
export { parent } from "./parent/...js";
export declare const fromDeclaration: number;
