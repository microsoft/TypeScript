//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace3.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type { A } from './a';

//// [c.ts]
export * as a from './b';

//// [d.ts]
import { a } from './c';
new a.A(); // Error


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
exports.a = void 0;
exports.a = require("./b");
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var c_1 = require("./c");
new c_1.a.A(); // Error
