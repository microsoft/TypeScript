//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace2.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export * as a from './a';

//// [c.ts]
import type { a } from './b';
export { a };

//// [d.ts]
import { a } from './c';
new a.A(); // Error


//// [a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = require("./a");
//// [c.js]
"use strict";
exports.__esModule = true;
//// [d.js]
"use strict";
exports.__esModule = true;
new a.A(); // Error
