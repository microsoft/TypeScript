//// [tests/cases/compiler/relativeNamesInClassicResolution.ts] ////

//// [a.ts]
import {x} from "./b"

//// [b.ts]
export let x = 1;

//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 1;
});
