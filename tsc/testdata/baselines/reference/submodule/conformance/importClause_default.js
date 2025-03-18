//// [tests/cases/conformance/externalModules/typeOnly/importClause_default.ts] ////

//// [a.ts]
export default class A { a!: string }

//// [b.ts]
import type A from './a';
new A();
let a: A = { a: '' };
let b = { A };


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class A {
    a;
}
exports.default = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new A();
let a = { a: '' };
let b = { A };
