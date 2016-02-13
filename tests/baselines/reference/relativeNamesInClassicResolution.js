//// [tests/cases/compiler/relativeNamesInClassicResolution.ts] ////

//// [a.ts]

import {x} from "./b"

//// [b.ts]
export let x = 1;

//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
});
