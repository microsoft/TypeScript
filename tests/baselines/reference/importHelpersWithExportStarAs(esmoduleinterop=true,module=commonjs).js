//// [tests/cases/compiler/importHelpersWithExportStarAs.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
export * as a from "./a";

//// [tslib.d.ts]
declare module "tslib" {
    function __importStar(m: any): void;
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const tslib_1 = require("tslib");
exports.a = (0, tslib_1.__importStar)(require("./a"));
