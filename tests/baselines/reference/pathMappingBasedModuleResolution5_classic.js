//// [tests/cases/compiler/pathMappingBasedModuleResolution5_classic.ts] ////

//// [file4.ts]
export var z1 = 1;
//// [file1.ts]
import {x} from "folder2/file1"
import {y} from "folder3/file2"
import {z} from "components/file3"
import {z1} from "file4"

declare function use(a: any): void;

use(x.toExponential());
use(y.toExponential());
use(z.toExponential());
use(z1.toExponential());

//// [file1.ts]
export var x = 1;

//// [file2.ts]
export var y = 1;

//// [file3.ts]
export var z = 1;


//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 1;
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 1;
});
//// [file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 1;
});
//// [file4.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z1 = void 0;
    exports.z1 = 1;
});
//// [file1.js]
define(["require", "exports", "folder2/file1", "folder3/file2", "components/file3", "file4"], function (require, exports, file1_1, file2_1, file3_1, file4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    use(file1_1.x.toExponential());
    use(file2_1.y.toExponential());
    use(file3_1.z.toExponential());
    use(file4_1.z1.toExponential());
});
