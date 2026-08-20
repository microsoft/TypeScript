//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration_moduleSpecifier-isolatedModules.ts] ////

//// [a.ts]
export type A = {};

//// [b.ts]
export type { A } from './a'; // should not error, but would without `type`


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
