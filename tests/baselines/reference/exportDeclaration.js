//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration.ts] ////

//// [a.ts]
class A {}
export type { A };

//// [b.ts]
import { A } from './a';
declare const a: A;
new A();


//// [a.js]
"use strict";
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
//// [b.js]
"use strict";
exports.__esModule = true;
new A();
