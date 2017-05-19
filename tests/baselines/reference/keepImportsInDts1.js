//// [tests/cases/compiler/keepImportsInDts1.ts] ////

//// [test.d.ts]
export {}; 
//// [main.ts]
import "test"

//// [main.js]
define(["require", "exports", "test"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [main.d.ts]
import "test";
