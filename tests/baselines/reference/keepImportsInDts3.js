//// [tests/cases/compiler/keepImportsInDts3.ts] ////

//// [test.ts]

export {};
//// [main.ts]
import "test"

//// [outputfile.js]
define("test", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("app/main", ["require", "exports", "test"], function (require, exports) {
    "use strict";
});


//// [outputfile.d.ts]
declare module "test" {
    export {  };
}
declare module "app/main" {
    import "test";
}
