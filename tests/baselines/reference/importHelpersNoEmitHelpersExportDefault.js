//// [tests/cases/compiler/importHelpersNoEmitHelpersExportDefault.ts] ////

//// [main.ts]
// https://github.com/microsoft/TypeScript/issues/40328
export { default as A } from "./other";

//// [main2.ts]
export { default } from "./other";

//// [other.ts]
export default {};

//// [tslib.d.ts]
declare module "tslib" {
    function __importDefault(m: any): void;
}

//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var tslib_1 = require("tslib");
// https://github.com/microsoft/TypeScript/issues/40328
var other_1 = require("./other");
Object.defineProperty(exports, "A", { enumerable: true, get: function () { return tslib_1.__importDefault(other_1).default; } });
//// [main2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var tslib_1 = require("tslib");
var other_1 = require("./other");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return tslib_1.__importDefault(other_1).default; } });
