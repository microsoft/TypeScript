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
exports.a = 1;
exports.b = 2;
exports.c = 3;
//// [justone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = require("./items");
exports.a = items_1.a;
exports.b = items_1.b;
exports.c = items_1.c;
//// [two.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = require("./items");
exports.a = items_1.a;
var items_2 = require("./items");
exports.b = items_2.b;
exports.c = items_2.c;
//// [multiple.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = require("./items");
exports.a = items_1.a;
exports.b = items_1.b;
var two_1 = require("./two");
exports.aa = two_1.a;
var two_2 = require("./two");
exports.bb = two_2.b;
var two_3 = require("./two");
exports.c = two_3.c;
var items_2 = require("./items");
exports.cc = items_2.c;


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
