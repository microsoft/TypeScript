//// [tests/cases/compiler/es6ImportEqualsExportModuleCommonJsError.ts] ////

//// [a.ts]
class a { }
export = a;

//// [main.ts]
import * as a from "./a";
a;




//// [a.js]
"use strict";
class a {
}
module.exports = a;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("./a");
a;
