//// [tests/cases/conformance/externalModules/typeOnly/grammarErrors.ts] ////

//// [a.ts]
export default class A {}
export class B {}
export class C {}

//// [b.ts]
import type A, { B, C } from './a';

//// [a.js]
import type A from './a';
export type { A };


//// [b.js]
"use strict";
exports.__esModule = true;
