//// [tests/cases/compiler/noFlakyDeclarationEmitSharedCheckerOrder.ts] ////

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

//// [a.ts]
import * as MA from "./ma";
export const fromA = MA.pa;

//// [b.ts]
import * as MB from "./mb";
export const fromB = MB.pb;

//// [c.ts]
export const c = 1;


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
//// [a.js]
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
exports.fromA = void 0;
const MA = __importStar(require("./ma"));
exports.fromA = MA.pa;
//// [b.js]
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
exports.fromB = void 0;
const MB = __importStar(require("./mb"));
exports.fromB = MB.pb;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 1;


//// [xb.d.ts]
export = o;
declare const o: {
    v: {
        pa: {};
        ma: 1;
    };
};
//// [mb.d.ts]
export { v as pb } from "./xb";
export declare const mb = 1;
//// [xa.d.ts]
export = o;
declare const o: {
    v: {};
};
//// [ma.d.ts]
export { v as pa } from "./xa";
export declare const ma = 1;
//// [a.d.ts]
export declare const fromA: {};
//// [b.d.ts]
export declare const fromB: {
    pa: {};
    ma: 1;
};
//// [c.d.ts]
export declare const c = 1;
