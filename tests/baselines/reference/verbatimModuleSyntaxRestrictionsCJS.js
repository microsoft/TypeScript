//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxRestrictionsCJS.ts] ////

//// [decl.d.ts]
declare function esmy(): void;
export default esmy;
export declare function funciton(): void;

//// [ambient.d.ts]
declare module "ambient" {
    const _default: number;
    export default _default;
}

//// [main.ts]
import esmy from "./decl"; // error
import * as esmy2 from "./decl"; // error
import { funciton } from "./decl"; // error
import type { funciton as funciton2 } from "./decl"; // ok I guess?
import("./decl"); // error
type T = typeof import("./decl"); // ok
export {}; // error
export const x = 1; // error
export interface I {} // ok
export type { T }; // ok
export namespace JustTypes {
    export type T = number;
}
export namespace Values { // error
    export const x = 1;
}
export default interface Default {} // sketchy, but ok

//// [main2.ts]
export interface I {}
export = { x: 1 };

//// [main3.ts]
namespace ns {
    export const x = 1;
    export interface I {}
}
export = ns;

//// [main4.ts]
export default 1; // error

//// [main5.ts]
export default class C {} // error

//// [main6.ts]
interface I {}
export default I; // error

//// [main7.ts]
import type esmy from "./decl";
export default esmy; // error


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Values = exports.x = void 0;
const decl_1 = __importDefault(require("./decl")); // error
const esmy2 = __importStar(require("./decl")); // error
const decl_2 = require("./decl"); // error
Promise.resolve().then(() => __importStar(require("./decl"))); // error
exports.x = 1; // error
var Values;
(function (Values) {
    Values.x = 1;
})(Values || (exports.Values = Values = {}));
//// [main2.js]
"use strict";
module.exports = { x: 1 };
//// [main3.js]
"use strict";
var ns;
(function (ns) {
    ns.x = 1;
})(ns || (ns = {}));
module.exports = ns;
//// [main4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 1; // error
//// [main5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
} // error
exports.default = C;
//// [main6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = I; // error
//// [main7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = esmy; // error
