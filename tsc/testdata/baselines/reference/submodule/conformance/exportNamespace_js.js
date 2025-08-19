//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace_js.ts] ////

//// [a.js]
export class A {}

//// [b.js]
export type * from './a';

//// [c.js]
import { A } from './b';
A;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
A;


//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
export type * from './a';
//// [c.d.ts]
export {};
