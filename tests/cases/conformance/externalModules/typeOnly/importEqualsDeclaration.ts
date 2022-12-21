// @noTypesAndSymbols: true
// @declaration: true

// @Filename: /a.ts
class A { a!: string }
export = A;

// @Filename: /b.ts
class SomeClass {}
export = SomeClass;

// @Filename: /c.ts
import type A = require('./a'); // Ok
import type = require('./b');   // Ok

A.prototype; // Error
const a: A = { a: 'a' }; // Ok
void type; // Ok
export declare const AConstructor: typeof A; // Ok
