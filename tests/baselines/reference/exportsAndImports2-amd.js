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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = exports.x = void 0;
    exports.x = "x";
    exports.y = "y";
});
//// [t2.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = exports.y = void 0;
    Object.defineProperty(exports, "y", { enumerable: true, get: function () { return t1_1.x; } });
    Object.defineProperty(exports, "x", { enumerable: true, get: function () { return t1_1.y; } });
});
//// [t3.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = exports.y = void 0;
    Object.defineProperty(exports, "y", { enumerable: true, get: function () { return t1_1.x; } });
    Object.defineProperty(exports, "x", { enumerable: true, get: function () { return t1_1.y; } });
});
