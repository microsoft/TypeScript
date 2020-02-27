//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace4.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type * from './a';

//// [c.ts]
export type * as ns from './a';

//// [d.ts]
import { A } from './b';
A; // Error

//// [e.ts]
import { ns } from './c';
ns.A; // Error


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
exports.__esModule = true;
//// [d.js]
"use strict";
exports.__esModule = true;
A; // Error
//// [e.js]
"use strict";
exports.__esModule = true;
ns.A; // Error
