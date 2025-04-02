// @moduleResolution: node
// @traceResolution: true


// @filename: /a/b/tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "fake:thing": ["./node_modules/fake/thing"]
        }
    }
}
// @filename: /a/b/node_modules/fake/thing/index.d.ts
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
// @filename: /a/b/main.ts
import * as ph from 'fake:thing'
console.log(ph.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE)
