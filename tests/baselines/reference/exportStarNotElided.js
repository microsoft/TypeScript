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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
var r = [];
function register(data) {
    r.push(data);
}
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliased = void 0;
__exportStar(require("./register"), exports);
__exportStar(require("./data1"), exports);
exports.aliased = require("./data1");
//// [data1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
(0, _1.register)("ok");
