//// [tests/cases/conformance/externalModules/typeOnly/importEqualsDeclaration.ts] ////

//// [a.ts]
class A { a!: string }
export = A;

//// [b.ts]
class SomeClass {}
export = SomeClass;

//// [c.ts]
import type A = require('./a'); // Ok
import type = require('./b');   // Ok

A.prototype; // Error
const a: A = { a: 'a' }; // Ok
void type; // Ok
export declare const AConstructor: typeof A; // Ok


//// [a.js]
"use strict";
class A {
    a;
}
module.exports = A;
//// [b.js]
"use strict";
class SomeClass {
}
module.exports = SomeClass;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type = require("./b");
A.prototype;
const a = { a: 'a' };
void type;
