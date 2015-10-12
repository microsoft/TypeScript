/// <reference path="fourslash.ts" />

// @declaration: true
// @out: out.js
// @jsExtensions: js
// @Filename: b.js
// @emitThisFile: true
////function foo() { return 10; }/*1*/

// @Filename: a.ts
// @emitThisFile: true
////function foo() { return 30; }/*2*/

goTo.marker("2");
verify.getSemanticDiagnostics("[]");
verify.verifyGetEmitOutputContentsForCurrentFile([
    { fileName: "out.js", content: "function foo() { return 10; }\r\nfunction foo() { return 30; }\r\n" },
    { fileName: "out.d.ts", content: "" }]);
goTo.marker("2");
verify.getSemanticDiagnostics('[\n  {\n    "message": "Duplicate function implementation.",\n    "start": 9,\n    "length": 3,\n    "category": "error",\n    "code": 2393\n  }\n]');