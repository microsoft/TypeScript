/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "plugins": [
////             { "name": "configurable-diagnostic-adder" , "message": "configured error" }
////         ]
////     },
////     "files": ["a.ts"]
//// }

// @Filename: a.ts
//// let x = [1, 2];
//// /**/
//// 

// Test that plugin adds an error message which is able to be configured
goTo.marker();
verify.getSemanticDiagnostics([{ message: "configured error", code: 9999, range: { pos: 0, end: 3, fileName: "a.ts" } }]);
config.configurePlugin("configurable-diagnostic-adder", { message: "new error" });
verify.getSemanticDiagnostics([{ message: "new error", code: 9999, range: { pos: 0, end: 3, fileName: "a.ts" } }]);
