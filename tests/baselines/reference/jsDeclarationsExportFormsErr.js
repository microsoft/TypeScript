//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportFormsErr.ts] ////

//// [cls.js]
export class Foo {}

//// [bar.js]
import ns = require("./cls");
export = ns; // TS Only

//// [bin.js]
import * as ns from "./cls";
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in

//// [globalNs.js]
export * from "./cls";
export as namespace GLO; // TS Only

//// [includeAll.js]
import "./bar";
import "./bin";
import "./globalNs";


//// [cls.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [bar.js]
"use strict";
var ns = require("./cls");
module.exports = ns;
//// [bin.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ns = require("./cls");
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in
//// [globalNs.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./cls"));
//// [includeAll.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bar");
require("./bin");
require("./globalNs");


//// [cls.d.ts]
export class Foo {
}
//// [bar.d.ts]
export = ns;
import ns = require("./bar");
//// [bin.d.ts]
export {};
//// [globalNs.d.ts]
export * from "./cls";
//// [includeAll.d.ts]
export {};
