//// [tests/cases/compiler/exportDefaultInterface.ts] ////

//// [a.ts]
export default interface A {}

//// [b.ts]
import A from './a'


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
