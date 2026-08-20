//// [tests/cases/compiler/exportStarNotElided.ts] ////

//// [register.ts]
const r: any[] = [];
export function register(data: any) {
  r.push(data);
}
//// [data1.ts]
import { register } from "./";
register("ok");
//// [index.ts]
export * from "./register";
export * from "./data1";
export * as aliased from "./data1";

//// [register.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const r = [];
function register(data) {
    r.push(data);
}
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.aliased = void 0;
__exportStar(require("./register"), exports);
__exportStar(require("./data1"), exports);
exports.aliased = __importStar(require("./data1"));
//// [data1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
(0, _1.register)("ok");
