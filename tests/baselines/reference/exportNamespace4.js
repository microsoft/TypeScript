//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace4.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type * from './a';

//// [c.ts]
export type * as ns from './a';

//// [d.ts]
import { A } from './b';
A;

//// [e.ts]
import { ns } from './c';
ns.A;


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
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
A;
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ns.A;


//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
export type * from './a';
//// [c.d.ts]
export type * as ns from './a';
//// [d.d.ts]
export {};
//// [e.d.ts]
export {};
