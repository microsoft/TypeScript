//// [tests/cases/conformance/externalModules/typeOnly/importDefaultNamedType.ts] ////

//// [a.ts]
export default class A {}

//// [b.ts]
import type from './a';


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class A {
}
exports.default = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
