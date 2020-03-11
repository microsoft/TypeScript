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
exports.__esModule = true;
exports.x = void 0;
exports.x = "x";
//// [t2.js]
"use strict";
exports.__esModule = true;
exports.from = exports.x = void 0;
"./t1";
//// [t3.js]
"use strict";
exports.__esModule = true;
exports.from = void 0;
"./t1";
//// [t4.js]
"use strict";
exports.__esModule = true;
exports.from = exports.a = void 0;
"./t1";
//// [t5.js]
"use strict";
exports.__esModule = true;
exports.from = exports.a = void 0;
"./t1";
