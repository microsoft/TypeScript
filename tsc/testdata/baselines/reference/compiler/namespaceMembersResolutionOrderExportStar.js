//// [tests/cases/compiler/namespaceMembersResolutionOrderExportStar.ts] ////

//// [ma.js]
export { v as pa } from "./xa";
export const ma = 1;

//// [mb.js]
export { v as pb } from "./xb";
export const mb = 1;

//// [xa.js]
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

//// [xb.js]
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

//// [ia.js]
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

//// [ib.js]
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

//// [star.js]
export { v as a } from "./ia";

//// [index.js]
export { v as b } from "./ib";
export * from "./star";
export const f1 = 1;
export const f2 = 2;
export const f3 = 3;
export const f4 = 4;
export const f5 = 5;
export const f6 = 6;
export const f7 = 7;
export const f8 = 8;
export const f9 = 9;
export const f10 = 10;

//// [main.ts]
import * as idx from "./index";
const all = { ...idx };
import * as MA from "./ma";
import * as MB from "./mb";
export const fromA = MA.pa;
export const fromB = MB.pb;
export const checkA: 1 = MA.pa.mb;
export const checkB: 1 = MB.pb.ma;


//// [xa.js]
"use strict";
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;
//// [ma.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ma = exports.pa = void 0;
var xa_1 = require("./xa");
Object.defineProperty(exports, "pa", { enumerable: true, get: function () { return xa_1.v; } });
exports.ma = 1;
//// [xb.js]
"use strict";
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;
//// [mb.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mb = exports.pb = void 0;
var xb_1 = require("./xb");
Object.defineProperty(exports, "pb", { enumerable: true, get: function () { return xb_1.v; } });
exports.mb = 1;
//// [ib.js]
"use strict";
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;
//// [ia.js]
"use strict";
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;
//// [star.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var ia_1 = require("./ia");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return ia_1.v; } });
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.f10 = exports.f9 = exports.f8 = exports.f7 = exports.f6 = exports.f5 = exports.f4 = exports.f3 = exports.f2 = exports.f1 = exports.b = void 0;
var ib_1 = require("./ib");
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return ib_1.v; } });
__exportStar(require("./star"), exports);
exports.f1 = 1;
exports.f2 = 2;
exports.f3 = 3;
exports.f4 = 4;
exports.f5 = 5;
exports.f6 = 6;
exports.f7 = 7;
exports.f8 = 8;
exports.f9 = 9;
exports.f10 = 10;
//// [main.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkB = exports.checkA = exports.fromB = exports.fromA = void 0;
const idx = __importStar(require("./index"));
const all = { ...idx };
const MA = __importStar(require("./ma"));
const MB = __importStar(require("./mb"));
exports.fromA = MA.pa;
exports.fromB = MB.pb;
exports.checkA = MA.pa.mb;
exports.checkB = MB.pb.ma;


//// [xa.d.ts]
export = o;
declare const o: {
    v: {
        pb: {};
        mb: 1;
    };
};
//// [ma.d.ts]
export { v as pa } from "./xa";
export declare const ma = 1;
//// [xb.d.ts]
export = o;
declare const o: {
    v: {};
};
//// [mb.d.ts]
export { v as pb } from "./xb";
export declare const mb = 1;
//// [ib.d.ts]
export = o;
declare const o: {
    v: {
        pb: {};
        mb: 1;
    };
};
//// [ia.d.ts]
export = o;
declare const o: {
    v: {
        pa: {
            pb: {};
            mb: 1;
        };
        ma: 1;
    };
};
//// [star.d.ts]
export { v as a } from "./ia";
//// [index.d.ts]
export { v as b } from "./ib";
export * from "./star";
export declare const f1 = 1;
export declare const f2 = 2;
export declare const f3 = 3;
export declare const f4 = 4;
export declare const f5 = 5;
export declare const f6 = 6;
export declare const f7 = 7;
export declare const f8 = 8;
export declare const f9 = 9;
export declare const f10 = 10;
//// [main.d.ts]
export declare const fromA: {
    pb: {};
    mb: 1;
};
export declare const fromB: {};
export declare const checkA: 1;
export declare const checkB: 1;
