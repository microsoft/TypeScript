//// [tests/cases/compiler/cacheResolutions.ts] ////

//// [app.ts]

export let x = 1;

//// [lib1.ts]
export let x = 1;

//// [lib2.ts]
export let x = 1;

//// [app.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
    exports.__esModule = true;
});
//// [lib1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
    exports.__esModule = true;
});
//// [lib2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
    exports.__esModule = true;
});
