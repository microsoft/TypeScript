//// [tests/cases/compiler/importHelpersWithImportOrExportDefault.ts] ////

//// [a.ts]
export default class { }

//// [b.ts]
export { default } from "./a";
export { default as a } from "./a";
import { default as b } from "./a";
void b;

//// [tslib.d.ts]
declare module "tslib" {
    function __importDefault(m: any): void;
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
}
exports.default = default_1;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = exports.default = void 0;
const tslib_1 = require("tslib");
const a_1 = tslib_1.__importDefault(require("./a"));
var a_2 = require("./a");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return tslib_1.__importDefault(a_2).default; } });
var a_3 = require("./a");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return tslib_1.__importDefault(a_3).default; } });
void a_1.default;
