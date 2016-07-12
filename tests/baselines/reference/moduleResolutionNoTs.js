//// [tests/cases/compiler/moduleResolutionNoTs.ts] ////

//// [m.ts]
export default 0;

//// [user.ts]
import x from "./m.ts";


//// [m.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [user.js]
"use strict";
