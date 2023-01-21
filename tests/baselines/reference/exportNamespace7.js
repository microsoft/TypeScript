//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace7.ts] ////

//// [a.ts]
export class A {}
export class B {}
export class C {}

//// [b.ts]
export type * from "./a";
export class C {}

//// [c.ts]
import { A, B, C } from "./b";
let _: A = new A();  // Error
let __: B = new B(); // Error
let ___: C = new C(); // Ok

//// [d.ts]
export type * from "./b";

//// [e.ts]
import { A, B, C } from "./d";
let _: A = new A();   // Error
let __: B = new B();  // Error
let ___: C = new C(); // Error


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.B = exports.A = void 0;
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
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var _ = new A(); // Error
var __ = new B(); // Error
var ___ = new b_1.C(); // Ok
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = new A(); // Error
var __ = new B(); // Error
var ___ = new C(); // Error
