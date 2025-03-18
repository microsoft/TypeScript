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
class A {
}
exports.A = A;
class B {
}
exports.B = B;
class C {
}
exports.C = C;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
}
exports.C = C;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
let _ = new A();
let __ = new B();
let ___ = new b_1.C();
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = new A();
let __ = new B();
let ___ = new C();
