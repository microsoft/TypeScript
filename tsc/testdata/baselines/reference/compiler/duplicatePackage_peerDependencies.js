//// [tests/cases/compiler/duplicatePackage_peerDependencies.ts] ////

//// [index.d.ts]
export { Foo } from "foo";

//// [index.d.ts]
export class Foo { private x; }

//// [package.json]
{ "name": "foo", "version": "1.0.0", "peerDependencies": { "peer-b": "*", "peer-a": "*" } }
//// [index.d.ts]
export const a: string;
//// [package.json]
{ "name": "peer-a", "version": "2.0.0" }
//// [index.d.ts]
export const b: string;
//// [package.json]
{ "name": "peer-b", "version": "3.0.0" }

//// [index.d.ts]
export { Foo } from "foo";

//// [index.d.ts]
export class Foo { private x; }

//// [package.json]
{ "name": "foo", "version": "1.0.0", "peerDependencies": { "peer-a": "*", "peer-b": "*" } }
//// [index.d.ts]
export const a: string;
//// [package.json]
{ "name": "peer-a", "version": "2.0.0" }
//// [index.d.ts]
export const b: string;
//// [package.json]
{ "name": "peer-b", "version": "3.0.0" }

//// [a.ts]
import { Foo as FooA } from "a";
import { Foo as FooB } from "b";

// Both should be the same type because the packages are deduplicated.
let x: FooA = new FooB();
let y: FooB = new FooA();


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("a");
const b_1 = require("b");
// Both should be the same type because the packages are deduplicated.
let x = new b_1.Foo();
let y = new a_1.Foo();
