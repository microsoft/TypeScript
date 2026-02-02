//// [tests/cases/conformance/externalModules/exportTypeMergedWithExportStarAsNamespace.ts] ////

//// [usage.ts]
import { Something } from "./prelude"
export const myValue: Something<string> = Something.of("abc")
export type MyType = Something.SubType<string>

//// [Something.ts]
export type Something<A> = { value: A }
export type SubType<A> = { value: A }
export declare function of<A>(value: A): Something<A>

//// [prelude.ts]
import * as S from "./Something"
export * as Something from "./Something"
export type Something<A> = S.Something<A>


//// [Something.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [prelude.js]
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
exports.Something = void 0;
exports.Something = __importStar(require("./Something"));
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myValue = void 0;
const prelude_1 = require("./prelude");
exports.myValue = prelude_1.Something.of("abc");
