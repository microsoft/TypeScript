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
var a_1 = require("./a");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return a_1.default; } });
var a_2 = require("./a");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return a_2.default; } });
const a_3 = require("./a");
void a_3.default;
