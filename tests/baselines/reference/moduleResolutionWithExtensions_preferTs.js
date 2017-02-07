//// [tests/cases/compiler/moduleResolutionWithExtensions_preferTs.ts] ////

//// [b.js]


//// [index.ts]
export default 0;

//// [a.ts]
import b from "./b";


//// [index.js]
"use strict";
exports["default"] = 0;
exports.__esModule = true;
//// [a.js]
"use strict";
exports.__esModule = true;
