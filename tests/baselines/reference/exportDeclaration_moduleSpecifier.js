//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration_moduleSpecifier.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type { A } from './a';

//// [c.ts]
import { A } from './b';
declare const a: A;
new A();


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
new A();
