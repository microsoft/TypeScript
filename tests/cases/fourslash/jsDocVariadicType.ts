///<reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: dummy.js
//// /**
////  * @type {function(boolean, string, ...*):void}
////  */
//// const foo = function (a, b, ...r) { };

// @Filename: file1.ts
//// foo(false, '');

goTo.file("file1.ts");
verify.getSemanticDiagnostics([]);
