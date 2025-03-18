//// [tests/cases/compiler/compositeWithNodeModulesSourceFile.ts] ////

//// [index.ts]
export class c { }

//// [test.ts]
import myModule = require("myModule");
new myModule.c();



//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
class c {
}
exports.c = c;
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myModule = require("myModule");
new myModule.c();
