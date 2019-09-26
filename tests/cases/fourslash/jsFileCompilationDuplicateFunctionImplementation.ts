/// <reference path="fourslash.ts" />

// @declaration: true
// @out: out.js
// @allowJs: true
// @Filename: b.js
// @emitThisFile: true
////function foo() { return 10; }/*1*/

// @Filename: a.ts
// @emitThisFile: true
////function [|foo|]() { return 30; }/*2*/

goTo.marker("1");
verify.getSemanticDiagnostics([]);
goTo.marker("2");
verify.getSemanticDiagnostics([{
    message: "Duplicate function implementation.",
    code: 2393
}]);
verify.verifyGetEmitOutputContentsForCurrentFile([
    { name: "out.js", text: "function foo() { return 10; }\r\nfunction foo() { return 30; }\r\n", writeByteOrderMark: false },
    { name: "out.d.ts", text: "declare function foo(): number;\r\ndeclare function foo(): number;\r\n", writeByteOrderMark: false }]);
goTo.marker("2");
verify.getSemanticDiagnostics([{
    message: "Duplicate function implementation.",
    code: 2393
}]);
goTo.marker("1");
verify.getSemanticDiagnostics([]);
