//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace1.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type { A } from './a';

//// [c.ts]
export * from './b';

//// [d.ts]
import { A } from './c';
new A(); // Error


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
exports.__esModule = true;
//// [c.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./b"));
//// [d.js]
"use strict";
exports.__esModule = true;
new A(); // Error
