/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_objectLiteralExpressions.baseline
// @Filename: bpSpan_objectLiteralExpressions.ts
////var x = {
////    a: 10,
////    b: () => 10,
////    someMethod() {
////        return "Hello";
////    },
////    get y() {
////        return 30;
////    },
////    set z(x: number) {
////        var bar = x;
////    }
////};
////var a = ({
////    a: 10,
////    b: () => 10,
////    someMethod() {
////        return "Hello";
////    },
////    get y() {
////        return 30;
////    },
////    set z(x: number) {
////        var bar = x;
////    }
////}).someMethod;
////a();

verify.baselineCurrentFileBreakpointLocations();