//// [tests/cases/compiler/importNonExportedMember2.ts] ////

//// [a.ts]
export {}
interface Foo {}

//// [b.ts]
import { Foo } from './a';


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
