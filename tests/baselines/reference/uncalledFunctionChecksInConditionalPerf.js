//// [tests/cases/compiler/uncalledFunctionChecksInConditionalPerf.ts] ////

//// [uncalledFunctionChecksInConditionalPerf.ts]
declare const b: boolean;

((((((((((((((((((((((((((b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b);


//// [uncalledFunctionChecksInConditionalPerf.js]
((((((((((((((((((((((((((b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b) && b);
