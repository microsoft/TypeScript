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
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 1;
});
//// [lib1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 1;
});
//// [lib2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 1;
});
