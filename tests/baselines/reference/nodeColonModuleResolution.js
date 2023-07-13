//// [tests/cases/compiler/nodeColonModuleResolution.ts] ////

//// [ph.d.ts]
declare module 'ph' {
    namespace constants {
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
}
declare module 'node:ph' {
    export * from 'ph';
}
//// [main.ts]
import * as ph from 'node:ph'
console.log(ph.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE)


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ph = require("node:ph");
console.log(ph.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE);
