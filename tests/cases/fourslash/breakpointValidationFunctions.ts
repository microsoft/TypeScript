/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_functions.baseline
// @Filename: bpSpan_functions.ts
////var greetings = 0;
////function greet(greeting: string): number {
////    greetings++;
////    return greetings;
////}
////function greet2(greeting: string, n = 10, x?: string, ...restParams: string[]): number {
////    greetings++;
////    return greetings;
////}
////function foo(greeting: string, n = 10, x?: string, ...restParams: string[])
////{
////    return;
////}
////module m {
////    var greetings = 0;
////    function greet(greeting: string): number {
////        greetings++;
////        return greetings;
////    }
////    function greet2(greeting: string, n = 10, x?: string, ...restParams: string[]): number {
////        greetings++;
////        return greetings;
////    }
////    function foo(greeting: string, n = 10, x?: string, ...restParams: string[])
////    {
////        return;
////    }
////}
////module m1 {
////    var greetings = 0;
////    export function greet(greeting: string): number {
////        greetings++;
////        return greetings;
////    }
////    export function greet2(greeting: string, n = 10, x?: string, ...restParams: string[]): number {
////        greetings++;
////        return greetings;
////    }
////    export function foo(greeting: string, n = 10, x?: string, ...restParams: string[])
////    {
////        return;
////    }
////}

verify.baselineCurrentFileBreakpointLocations();