//// [tests/cases/compiler/declarationEmitMappedTypeTemplateTypeofSymbol.ts] ////

//// [a.d.ts]
export declare const timestampSymbol: unique symbol;

export declare const Timestamp: {
    [TKey in typeof timestampSymbol]: true;
};

export declare function now(): typeof Timestamp;

//// [b.ts]
import * as x from "./a";
export const timestamp = x.now();

//// [c.ts]
import { now } from "./a";

export const timestamp = now();

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
exports.timestamp = void 0;
const x = __importStar(require("./a"));
exports.timestamp = x.now();
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const a_1 = require("./a");
exports.timestamp = (0, a_1.now)();


//// [b.d.ts]
import * as x from "./a";
export declare const timestamp: {
    [x.timestampSymbol]: true;
};
//// [c.d.ts]
export declare const timestamp: {
    [timestampSymbol]: true;
};
