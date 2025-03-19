//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace5.ts] ////

//// [a.ts]
export class A {}
export class B {}
export class X {}

//// [b.ts]
export type * from "./a";
export { X } from "./a";

//// [c.ts]
import { A, B as C, X } from "./b";
let _: A = new A();   // Error
let __: C = new C();  // Error
let ___: X = new X(); // Ok

//// [d.ts]
export type * from "./a";
export * from "./a";

//// [e.ts]
import { A, B, X } from "./d";
let _: A = new A();   // Ok
let __: B = new B();  // Ok
let ___: X = new X(); // Ok

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = exports.B = exports.A = void 0;
class A {
}
exports.A = A;
class B {
}
exports.B = B;
class X {
}
exports.X = X;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
const a_1 = require("./a");
Object.defineProperty(exports, "X", { enumerable: true, get: function () { return a_1.X; } });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
let _ = new A(); // Error
let __ = new C(); // Error
let ___ = new b_1.X(); // Ok
//// [d.js]
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
__exportStar(require("./a"), exports);
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d_1 = require("./d");
let _ = new d_1.A(); // Ok
let __ = new d_1.B(); // Ok
let ___ = new d_1.X(); // Ok
