//// [tests/cases/compiler/importNonExportedMember3.ts] ////

//// [a.ts]
export {}
interface Foo {}
interface Foo {}
namespace Foo {}

//// [b.ts]
import { Foo } from './a';


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
