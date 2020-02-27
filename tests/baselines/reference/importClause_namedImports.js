//// [tests/cases/conformance/externalModules/typeOnly/importClause_namedImports.ts] ////

//// [abc.ts]
export class A {}
export type B  = { b: string };
export const C = "";

//// [d.ts]
import type { A, B, C } from './abc';
new A();
declare let a: A;
declare let b: B;
b.b;


//// [abc.js]
"use strict";
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
exports.C = "";
//// [d.js]
"use strict";
exports.__esModule = true;
new A();
b.b;
