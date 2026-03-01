//// [tests/cases/compiler/unclosedExportClause01.ts] ////

//// [t1.ts]
export var x = "x";

//// [t2.ts]
export { x, from "./t1"

//// [t3.ts]
export { from "./t1"

//// [t4.ts]
export { x as a from "./t1"

//// [t5.ts]
export { x as a, from "./t1"

//// [t1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "x";
//// [t2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var t1_1 = require("./t1");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return t1_1.x; } });
//// [t3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [t4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var t1_1 = require("./t1");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.x; } });
//// [t5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var t1_1 = require("./t1");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.x; } });
