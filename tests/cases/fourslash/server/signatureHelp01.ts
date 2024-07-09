/// <reference path="../fourslash.ts"/>

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
