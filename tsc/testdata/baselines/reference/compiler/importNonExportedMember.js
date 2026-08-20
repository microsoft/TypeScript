//// [tests/cases/compiler/importNonExportedMember.ts] ////

//// [a.ts]
declare function foo(): any
declare function bar(): any;
export { foo, bar as baz };

//// [b.ts]
import { foo, bar } from "./a";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.baz = bar;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
