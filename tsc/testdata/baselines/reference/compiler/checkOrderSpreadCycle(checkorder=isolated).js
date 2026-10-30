//// [tests/cases/compiler/checkOrderSpreadCycle.ts] ////

//// [ma.js]
export { v as pa } from "./xa";
export const ma = 1;

//// [mb.js]
export { v as pb } from "./xb";
export const mb = 1;

//// [xa.js]
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };

//// [xb.js]
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };

//// [ia.js]
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };


//// [xb.js]
"use strict";
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };
//// [mb.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mb = exports.pb = void 0;
var xb_1 = require("./xb");
Object.defineProperty(exports, "pb", { enumerable: true, get: function () { return xb_1.v; } });
exports.mb = 1;
//// [xa.js]
"use strict";
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };
//// [ma.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ma = exports.pa = void 0;
var xa_1 = require("./xa");
Object.defineProperty(exports, "pa", { enumerable: true, get: function () { return xa_1.v; } });
exports.ma = 1;
//// [ia.js]
"use strict";
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };


//// [mb.d.ts]
export { v as pb } from "./xb";
export declare const mb = 1;
//// [ma.d.ts]
export { v as pa } from "./xa";
export declare const ma = 1;
