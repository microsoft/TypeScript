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
exports.Foo = void 0;
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./cls"), exports);
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
import ns = require("./cls");
//// [bin.d.ts]
export {};
//// [globalNs.d.ts]
export * from "./cls";
//// [includeAll.d.ts]
export {};
