//// [tests/cases/conformance/externalModules/typeOnly/chained.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as B };
export type Z = A;

//// [b.ts]
import { Z as Y } from './a';
export { B as C } from './a';

//// [c.ts]
import type { C } from './b';
export { C as D };

//// [d.ts]
import { D } from './c';
new D();
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
//// [d.js]
"use strict";
exports.__esModule = true;
new D();
var d = {};
