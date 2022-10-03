/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_functionExpressions.baseline
// @Filename: bpSpan_functionExpressions.ts
////var greetings = 0;
////var greet = (greeting: string): number => {
////    greetings++;
////    return greetings;
////}
////greet("Hello");
////var incrGreetings = () => greetings++;
////var greetNewMsg = msg => greet(msg);
////greetNewMsg = function (msg: string) {
////    return greet(msg);
////};
////function bar(a = function foo() {
////    return greetings;
////}) {
////    if (!a()) {
////        return a;
////    }
////    return function bar() {
////        return -greetings;
////    };
////}
verify.baselineCurrentFileBreakpointLocations();