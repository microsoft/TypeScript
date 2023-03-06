//// [tests/cases/compiler/importNonExportedMember1.ts] ////

//// [a.ts]
declare function foo(): any
declare function bar(): any;
export { foo };

//// [b.ts]
import { bar } from "./a";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
