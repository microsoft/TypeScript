//// [tests/cases/compiler/emptyDeclarationEmitIsModule.ts] ////

//// [module.ts]
import * as i from "./index";
class Foo {}
//// [index.ts]
import {} from "./module";
export interface Bar {
    x: string
}

//// [index.js]
"use strict";
exports.__esModule = true;
require("./module");
//// [module.js]
"use strict";
exports.__esModule = true;
require("./index");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());


//// [index.d.ts]
export interface Bar {
    x: string;
}
//// [module.d.ts]
export {};
