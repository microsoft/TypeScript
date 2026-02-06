//// [tests/cases/compiler/preserveUnusedImports.ts] ////

//// [a.ts]
export type A = {};

//// [b.ts]
export class B {}

//// [c.ts]
import { A } from './a';
import { B } from './b';

let b: B;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class B {
}
exports.B = B;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b;
