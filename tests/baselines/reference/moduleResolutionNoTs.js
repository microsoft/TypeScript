//// [tests/cases/compiler/moduleResolutionNoTs.ts] ////

//// [m.ts]
export default 0;

//// [user.ts]
// '.ts' extension is OK in a reference
///<reference path="./m.ts"/>

import x from "./m.ts";


//// [m.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [user.js]
// '.ts' extension is OK in a reference
///<reference path="./m.ts"/>
"use strict";
