/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_classAmbient.baseline
// @Filename: bpSpan_classAmbient.ts
////declare class Greeter {
////    public greeting: string;
////    constructor(greeting: string, ...b: string[]);
////    greet(): string;
////    private val;
////    static x: number;
////    static fn(a: number, ...b:string[]);
////}

verify.baselineCurrentFileBreakpointLocations();