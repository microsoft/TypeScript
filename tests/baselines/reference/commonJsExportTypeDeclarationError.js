//// [tests/cases/compiler/commonJsExportTypeDeclarationError.ts] ////

//// [test.js]
module.exports = {
   message: ""
}

//// [types1.ts]
import test from "./test";
export type test

//// [types2.ts]
import test from "./test";
export type test = 

//// [types3.ts]
import test from "./test";
export type test = test;


//// [test.js]
module.exports = {
    message: ""
};
//// [types1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [types2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [types3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
