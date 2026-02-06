/// <reference path="../fourslash.ts"/>

// @lib: es5

////function foo(data: number) {
////}
////
////function bar {
////    foo(/*1*/)
////}

verify.signatureHelp({
    marker: "1",
    argumentCount: 0,
    parameterCount: 1,
    docComment: "",
});
