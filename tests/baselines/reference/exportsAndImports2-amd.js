//// [tests/cases/conformance/es6/modules/exportsAndImports2-amd.ts] ////

//// [t1.ts]

export var x = "x";
export var y = "y";

//// [t2.ts]
export { x as y, y as x } from "./t1";

//// [t3.ts]
import { x, y } from "./t1";
export { x as y, y as x };


//// [t1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = "x";
    exports.y = "y";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [t2.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    exports.y = t1_1.x;
    exports.x = t1_1.y;
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [t3.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    exports.y = t1_1.x;
    exports.x = t1_1.y;
    Object.defineProperty(exports, "__esModule", { value: true });
});
