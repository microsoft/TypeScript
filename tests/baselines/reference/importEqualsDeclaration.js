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
class A {
    a;
}
export {};
//// [b.js]
class SomeClass {
}
export {};
//// [c.js]
A.prototype; // Error
const a = { a: 'a' }; // Ok
void type; // Ok
export {};


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
