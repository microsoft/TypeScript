//// [tests/cases/compiler/pathMappingBasedModuleResolution9.ts] ////

//// [file1.ts]
import {x} from "folder2/file1"
import {y} from "folder3/file2"
import {z} from "components/file3"

declare function use(a: any): void;

use(x.toExponential());
use(y.toExponential());
use(z.toExponential());

//// [file1.ts]
export var x = 1;

//// [file2.ts]
export var y = 1;

//// [file3.ts]
export {z} from "./file4"

//// [file4.ts]
export var z = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.y = 1;
});
//// [file4.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.z = 1;
});
//// [file3.js]
define(["require", "exports", "./file4"], function (require, exports, file4_1) {
    "use strict";
    exports.z = file4_1.z;
});
//// [file1.js]
define(["require", "exports", "folder2/file1", "folder3/file2", "components/file3"], function (require, exports, file1_1, file2_1, file3_1) {
    "use strict";
    use(file1_1.x.toExponential());
    use(file2_1.y.toExponential());
    use(file3_1.z.toExponential());
});
