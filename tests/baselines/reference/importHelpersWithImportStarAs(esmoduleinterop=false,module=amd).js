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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    class A {
    }
    exports.A = A;
});
//// [b.js]
define(["require", "exports", "./a"], function (require, exports, a) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = a;
});
