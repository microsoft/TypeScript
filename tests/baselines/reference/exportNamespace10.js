//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace10.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type * as ns from "./a";

//// [c.ts]
import { ns } from "./b";
let _: ns.A = new ns.A(); // Error

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
var _ = new ns.A(); // Error
