//// [tests/cases/conformance/externalModules/typeOnly/ambient.ts] ////

//// [a.ts]
export class A { a!: string }

//// [b.ts]
import type { A } from './a';
declare class B extends A {}
declare namespace ns {
  class C extends A {}
}


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
