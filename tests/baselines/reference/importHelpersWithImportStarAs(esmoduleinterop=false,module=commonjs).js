//// [tests/cases/compiler/importHelpersWithImportStarAs.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import * as a from "./a";
export { a };

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
const a = require("./a");
exports.a = a;
