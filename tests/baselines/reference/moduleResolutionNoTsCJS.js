//// [tests/cases/compiler/moduleResolutionNoTsCJS.ts] ////

//// [x.ts]
// CommonJS output

export default 0;

//// [y.tsx]
export default 0;

//// [z.d.ts]
declare const x: number;
export default x;

//// [user.ts]
import x from "./x.ts";
import y from "./y.tsx";
import z from "./z.d.ts";

// Making sure the suggested fixes are valid:
import x2 from "./x";
import y2 from "./y";
import z2 from "./z";


//// [x.js]
"use strict";
// CommonJS output
exports.__esModule = true;
exports["default"] = 0;
//// [y.jsx]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [user.js]
"use strict";
exports.__esModule = true;
