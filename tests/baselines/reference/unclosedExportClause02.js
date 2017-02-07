//// [tests/cases/compiler/unclosedExportClause02.ts] ////

//// [t1.ts]

export var x = "x";

//// [t2.ts]
export { x, from
    "./t1";

//// [t3.ts]
export { from
    "./t1";

//// [t4.ts]
export { x as a from
    "./t1";

//// [t5.ts]
export { x as a, from
    "./t1";

//// [t1.js]
"use strict";
exports.x = "x";
exports.__esModule = true;
//// [t2.js]
"use strict";
"./t1";
exports.__esModule = true;
//// [t3.js]
"use strict";
"./t1";
exports.__esModule = true;
//// [t4.js]
"use strict";
"./t1";
exports.__esModule = true;
//// [t5.js]
"use strict";
"./t1";
exports.__esModule = true;
