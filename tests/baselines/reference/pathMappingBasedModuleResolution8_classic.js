//// [tests/cases/compiler/pathMappingBasedModuleResolution8_classic.ts] ////

//// [index.ts]
import {x} from "@speedy/folder1/testing"
declare function use(a: any): void;
use(x.toExponential());

//// [index.ts]
export const x = 1 + 2;


//// [index.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = 1 + 2;
});
//// [index.js]
define(["require", "exports", "@speedy/folder1/testing"], function (require, exports, testing_1) {
    "use strict";
    exports.__esModule = true;
    use(testing_1.x.toExponential());
});
