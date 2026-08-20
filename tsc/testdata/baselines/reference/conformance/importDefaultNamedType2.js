//// [tests/cases/conformance/externalModules/typeOnly/importDefaultNamedType2.ts] ////

//// [a.ts]
export default class A {}

//// [b.ts]
import type from from './a';


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class A {
}
exports.default = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
