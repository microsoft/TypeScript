//// [tests/cases/conformance/externalModules/typeOnly/importEquals1.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type * as types from './a';
export = types; // Error

//// [c.ts]
import * as types from './a';
export = types;

//// [d.ts]
import types from './b';
new types.A(); // Error

//// [e.ts]
import types = require('./b');
new types.A(); // Error

//// [f.ts]
import * as types from './b';
new types.A(); // Error

//// [g.ts]
import type types from './c'
new types.A(); // Error


//// [a.js]
"use strict";
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
module.exports = types;
//// [c.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var types = __importStar(require("./a"));
module.exports = types;
//// [d.js]
"use strict";
exports.__esModule = true;
new types.A(); // Error
//// [e.js]
"use strict";
exports.__esModule = true;
new types.A(); // Error
//// [f.js]
"use strict";
exports.__esModule = true;
new types.A(); // Error
//// [g.js]
"use strict";
exports.__esModule = true;
new types.A(); // Error
