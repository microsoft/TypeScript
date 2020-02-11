//// [tests/cases/compiler/importNonExportedMember.ts] ////

//// [a.ts]
declare function foo(): any
declare function bar(): any;
export { foo, bar as baz };

//// [b.ts]
import { foo, bar } from "./a";


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
