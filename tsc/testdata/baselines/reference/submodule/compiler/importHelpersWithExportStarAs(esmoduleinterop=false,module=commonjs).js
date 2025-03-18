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
exports.a = require("./a");
