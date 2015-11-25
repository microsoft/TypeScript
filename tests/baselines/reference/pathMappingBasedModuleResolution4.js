//// [tests/cases/compiler/pathMappingBasedModuleResolution4.ts] ////

//// [file1.ts]
import {x} from "folder2/file2"

declare function use(a: any): void;

use(x.toExponential());

//// [file2.ts]
export {x} from "./file3"

//// [file3.ts]
export var x = 1;

//// [file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
});
//// [file2.js]
define(["require", "exports", "./file3"], function (require, exports, file3_1) {
    "use strict";
    exports.x = file3_1.x;
});
//// [file1.js]
define(["require", "exports", "folder2/file2"], function (require, exports, file2_1) {
    "use strict";
    use(file2_1.x.toExponential());
});
