//// [tests/cases/compiler/keepImportsInDts4.ts] ////

//// [test.ts]
export {};
//// [main.ts]
import "./folder/test"

//// [outputfile.js]
define("folder/test", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("main", ["require", "exports", "folder/test"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [outputfile.d.ts]
declare module "folder/test" {
    export {};
}
declare module "main" {
    import "folder/test";
}
