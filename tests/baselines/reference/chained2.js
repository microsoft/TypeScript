//// [tests/cases/conformance/externalModules/typeOnly/chained2.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as default };

//// [b.ts]
import A from './a';
import type { default as B } from './a';
export { A, B };

//// [c.ts]
import * as types from './b';
export { types as default };

//// [d.ts]
import types from './c';
new types.A();
new types.B();
const a: types.A = {};
const b: types.B = {};


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
exports.__esModule = true;
//// [c.js]
"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var types = require("./b");
exports["default"] = types;
//// [d.js]
"use strict";
exports.__esModule = true;
var c_1 = require("./c");
new c_1["default"].A();
new c_1["default"].B();
var a = {};
var b = {};
