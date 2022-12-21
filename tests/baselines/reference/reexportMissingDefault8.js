//// [tests/cases/compiler/reexportMissingDefault8.ts] ////

//// [b.ts]
const b = null;
export = b;

//// [a.ts]
export { default } from "./b";

//// [b.js]
"use strict";
var b = null;
module.exports = b;
//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var b_1 = require("./b");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(b_1).default; } });
