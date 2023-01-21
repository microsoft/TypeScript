//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace8.ts] ////

//// [a.ts]
export class A {}
export class B {}

//// [b.ts]
export class B {}
export class C {}

//// [c.ts]
export type * from "./a";
export * from "./b"; // Collision error

//// [d.ts]
import { A, B, C } from "./c";
let _: A = new A();   // Error
let __: B = new B();  // Ok
let ___: C = new C(); // Ok


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
exports.C = exports.B = void 0;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
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
__exportStar(require("./b"), exports); // Collision error
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var c_1 = require("./c");
var _ = new A(); // Error
var __ = new c_1.B(); // Ok
var ___ = new c_1.C(); // Ok
