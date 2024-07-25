//// [tests/cases/conformance/externalModules/typeOnly/chained.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as B };
export type Z = A;

//// [b.ts]
import { Z as Y } from './a';
export { B as C } from './a';

//// [c.ts]
import type { C } from './b';
export { C as D };

//// [d.ts]
import { D } from './c';
new D();
const d: D = {};


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new D();
var d = {};
