/// <reference path="fourslash.ts" />

// @declaration: true
// @out: out.js
// @allowJs: true
// @Filename: b.js
// @emitThisFile: true
////function foo() { return 10; }/*1*/

// @Filename: a.ts
// @emitThisFile: true
////function foo() { return 30; }/*2*/

goTo.marker("1");
verify.getSemanticDiagnostics('[]');
goTo.marker("2");
verify.getSemanticDiagnostics('[\n  {\n    "message": "Duplicate function implementation.",\n    "start": 9,\n    "length": 3,\n    "category": "error",\n    "code": 2393\n  }\n]');
verify.verifyGetEmitOutputContentsForCurrentFile([
    { name: "out.js", text: "function foo() { return 10; }\r\nfunction foo() { return 30; }\r\n", writeByteOrderMark: false },
    { name: "out.d.ts", text: "", writeByteOrderMark: false }]);
goTo.marker("2");
verify.getSemanticDiagnostics('[\n  {\n    "message": "Duplicate function implementation.",\n    "start": 9,\n    "length": 3,\n    "category": "error",\n    "code": 2393\n  }\n]');
goTo.marker("1");
verify.getSemanticDiagnostics('[]');