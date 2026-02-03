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
Object.defineProperty(exports, "__esModule", { value: true });
//// [module.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
