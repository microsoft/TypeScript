//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration_moduleSpecifier-isolatedModules.ts] ////

//// [a.ts]
export type A = {};

//// [b.ts]
export type { A } from './a'; // should not error, but would without `type`


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
