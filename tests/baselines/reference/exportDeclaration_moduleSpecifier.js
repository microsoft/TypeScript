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
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
exports.__esModule = true;
//// [c.js]
"use strict";
exports.__esModule = true;
new A();
