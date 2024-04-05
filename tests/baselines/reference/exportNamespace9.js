//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace9.ts] ////

//// [a.ts]
export type A = number;

//// [b.ts]
export type * from "./a";

//// [c.ts]
import { A } from "./b";
const A = 1;
export { A };

//// [d.ts]
import { A } from "./c";
A; // Ok
type _ = A;

//// [e.ts]
export const A = 1;

//// [f.ts]
export * from "./e";
export type * from "./a"; // Collision error

//// [g.ts]
import { A } from "./f";
A;
type _ = A; // Follow-on from collision error


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = 1;
exports.A = A;
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var c_1 = require("./c");
c_1.A; // Ok
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
exports.A = 1;
//// [f.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./e"), exports);
//// [g.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var f_1 = require("./f");
f_1.A;
