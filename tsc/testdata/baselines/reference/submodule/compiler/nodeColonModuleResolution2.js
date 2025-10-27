//// [tests/cases/compiler/nodeColonModuleResolution2.ts] ////

//// [index.d.ts]
export namespace constants {
    const NODE_PERFORMANCE_GC_MAJOR: number;
    const NODE_PERFORMANCE_GC_MINOR: number;
    const NODE_PERFORMANCE_GC_INCREMENTAL: number;
    const NODE_PERFORMANCE_GC_WEAKCB: number;
    const NODE_PERFORMANCE_GC_FLAGS_NO: number;
    const NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED: number;
    const NODE_PERFORMANCE_GC_FLAGS_FORCED: number;
    const NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING: number;
    const NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE: number;
    const NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY: number;
    const NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE: number;
}
//// [main.ts]
import * as ph from 'fake:thing'
console.log(ph.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE)


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
const ph = __importStar(require("fake:thing"));
console.log(ph.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE);
