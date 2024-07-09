//// [tests/cases/compiler/symbolMergeValueAndImportedType.ts] ////

//// [main.ts]
import { X } from "./other";
const X = 42;
console.log('X is ' + X);
//// [other.ts]
export type X = {};

//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const X = 42;
console.log('X is ' + X);
