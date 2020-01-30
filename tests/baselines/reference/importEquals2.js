//// [tests/cases/conformance/externalModules/typeOnly/importEquals2.ts] ////

//// [a.ts]
class A {}
export type { A }

//// [b.ts]
import * as a from './a';
export = a;

//// [c.ts]
import a = require('./b');
new a.A(); // Error


//// [a.js]
"use strict";
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
//// [b.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var a = __importStar(require("./a"));
module.exports = a;
//// [c.js]
"use strict";
exports.__esModule = true;
var a = require("./b");
new a.A(); // Error
