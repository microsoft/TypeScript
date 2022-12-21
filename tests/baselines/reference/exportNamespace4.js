//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace4.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type * from './a'; // Grammar error

//// [c.ts]
export type * as ns from './a'; // Grammar error

//// [d.ts]
import { A } from './b';
A;

//// [e.ts]
import { ns } from './c';
ns.A;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
b_1.A;
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var c_1 = require("./c");
c_1.ns.A;
