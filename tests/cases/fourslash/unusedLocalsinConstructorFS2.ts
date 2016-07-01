/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////class greeter {
////    constructor() {/*0*/
////        var unused = 20;/*1*/
////        var used = "dummy";
////        used = used + "second part";
////    }
////}

verify.codeFixAtPosition(`
class greeter {
    constructor() {
        var used = "dummy";
        used = used + "second part";
    }
}`);
