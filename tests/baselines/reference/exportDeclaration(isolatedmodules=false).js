//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration.ts] ////

//// [a.ts]
class A {}
export type { A };

//// [b.ts]
import { A } from './a';
declare const a: A;
new A();

//// [c.ts]
import type { A } from './a';
export = A;

//// [d.ts]
import { A } from './a';
export = A;

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
new A();
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
