//// [tests/cases/conformance/externalModules/typeOnly/renamed.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as B };

//// [b.ts]
export type { B as C } from './a';

//// [c.ts]
import type { C as D } from './b';
const d: D = {};


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
var d = {};
