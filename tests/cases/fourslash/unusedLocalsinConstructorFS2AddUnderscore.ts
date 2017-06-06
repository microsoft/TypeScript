/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////class greeter {
////    [|constructor() {
////        var unused = 20;
////        var used = "dummy";
////        used = used + "second part";
////    } |]
////}

verify.rangeAfterCodeFix(`
    constructor() {
        var _unused = 20;
        var used = "dummy";
        used = used + "second part";
    }
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);