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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class default_1 {
    }
    exports.default = default_1;
});
//// [b.js]
define(["require", "exports", "tslib", "./a", "./a", "./a"], function (require, exports, tslib_1, a_1, a_2, a_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = exports.default = void 0;
    a_3 = (0, tslib_1.__importDefault)(a_3);
    Object.defineProperty(exports, "default", { enumerable: true, get: function () { return (0, tslib_1.__importDefault)(a_1).default; } });
    Object.defineProperty(exports, "a", { enumerable: true, get: function () { return (0, tslib_1.__importDefault)(a_2).default; } });
    void a_3.default;
});
