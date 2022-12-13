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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
module.exports = A;
//// [b.js]
"use strict";
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    return SomeClass;
}());
module.exports = SomeClass;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type = require("./b"); // Ok
A.prototype; // Error
var a = { a: 'a' }; // Ok
void type; // Ok


//// [a.d.ts]
declare class A {
    a: string;
}
export = A;
//// [b.d.ts]
declare class SomeClass {
}
export = SomeClass;
//// [c.d.ts]
import type A = require('./a');
export declare const AConstructor: typeof A;
