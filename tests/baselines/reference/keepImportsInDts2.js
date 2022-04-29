//// [tests/cases/compiler/keepImportsInDts2.ts] ////

//// [test.ts]
export {};
//// [main.ts]
import "./folder/test"

//// [test.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [main.js]
define(["require", "exports", "./folder/test"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [test.d.ts]
export {};
//// [main.d.ts]
import "./folder/test";
