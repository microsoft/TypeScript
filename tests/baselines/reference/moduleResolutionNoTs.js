//// [tests/cases/compiler/moduleResolutionNoTs.ts] ////

//// [x.ts]
export default 0;

//// [y.tsx]
export default 0;

//// [user.ts]
// '.ts' extension is OK in a reference
///<reference path="./x.ts"/>

import x from "./x.ts";
import y from "./y.tsx";

// Making sure the suggested fixes are valid:
import x2 from "./x";
import y2 from "./y";


//// [x.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [y.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [user.js]
// '.ts' extension is OK in a reference
///<reference path="./x.ts"/>
"use strict";
