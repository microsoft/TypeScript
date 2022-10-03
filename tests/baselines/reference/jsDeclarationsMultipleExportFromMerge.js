//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsMultipleExportFromMerge.ts] ////

//// [items.js]
export const a = 1;
export const b = 2;
export const c = 3;

//// [justone.js]
export { a, b, c } from "./items";

//// [two.js]
export { a } from "./items";
export { b, c } from "./items";

//// [multiple.js]
export {a, b} from "./items";
export {a as aa} from "./two";
export {b as bb} from "./two";
export {c} from "./two"
export {c as cc} from "./items";


//// [items.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;
exports.c = 3;
//// [justone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.b = exports.a = void 0;
var items_1 = require("./items");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return items_1.a; } });
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return items_1.b; } });
Object.defineProperty(exports, "c", { enumerable: true, get: function () { return items_1.c; } });
//// [two.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.b = exports.a = void 0;
var items_1 = require("./items");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return items_1.a; } });
var items_2 = require("./items");
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return items_2.b; } });
Object.defineProperty(exports, "c", { enumerable: true, get: function () { return items_2.c; } });
//// [multiple.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cc = exports.c = exports.bb = exports.aa = exports.b = exports.a = void 0;
var items_1 = require("./items");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return items_1.a; } });
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return items_1.b; } });
var two_1 = require("./two");
Object.defineProperty(exports, "aa", { enumerable: true, get: function () { return two_1.a; } });
var two_2 = require("./two");
Object.defineProperty(exports, "bb", { enumerable: true, get: function () { return two_2.b; } });
var two_3 = require("./two");
Object.defineProperty(exports, "c", { enumerable: true, get: function () { return two_3.c; } });
var items_2 = require("./items");
Object.defineProperty(exports, "cc", { enumerable: true, get: function () { return items_2.c; } });


//// [items.d.ts]
export const a: 1;
export const b: 2;
export const c: 3;
//// [justone.d.ts]
export { a, b, c } from "./items";
//// [two.d.ts]
export { a, b, c } from "./items";
//// [multiple.d.ts]
export { a, b, c as cc } from "./items";
export { a as aa, b as bb, c } from "./two";
