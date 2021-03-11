//// [tests/cases/compiler/exportStarNotElided.ts] ////

//// [register.ts]
const r: any[] = [];
export function register(data: any) {
  r.push(data);
}
//// [data1.ts]
import { register } from "./";
register("ok");
//// [index.ts]
export * from "./register";
export * from "./data1";
export * as aliased from "./data1";

//// [register.js]
"use strict";
exports.__esModule = true;
exports.register = void 0;
var r = [];
function register(data) {
    r.push(data);
}
exports.register = register;
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.aliased = void 0;
__exportStar(require("./register"), exports);
__exportStar(require("./data1"), exports);
exports.aliased = require("./data1");
//// [data1.js]
"use strict";
exports.__esModule = true;
var _1 = require("./");
(0, _1.register)("ok");
