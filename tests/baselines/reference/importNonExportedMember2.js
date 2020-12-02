//// [tests/cases/compiler/importNonExportedMember2.ts] ////

//// [a.ts]
export {}
interface Foo {}

//// [b.ts]
import { Foo } from './a';


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
