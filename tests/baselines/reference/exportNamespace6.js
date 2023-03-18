//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace6.ts] ////

//// [a.ts]
export class A {}
export class B {}

//// [b.ts]
export type * from "./a";

//// [c.ts]
export * from "./b";

//// [d.ts]
import { A, B } from "./c";
let _: A = new A();  // Error
let __: B = new B(); // Error

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
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
__exportStar(require("./b"), exports);
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = new A(); // Error
var __ = new B(); // Error
