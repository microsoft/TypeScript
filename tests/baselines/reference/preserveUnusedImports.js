//// [tests/cases/compiler/preserveUnusedImports.ts] ////

//// [a.ts]
export type A = {};

//// [b.ts]
export class B {}

//// [c.ts]
import { A } from './a';
import { B } from './b';

let b: B;


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.B = void 0;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
//// [c.js]
"use strict";
exports.__esModule = true;
require("./a");
require("./b");
var b;
