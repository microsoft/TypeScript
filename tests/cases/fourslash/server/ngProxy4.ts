/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "plugins": [
////             { "name": "diagnostic-adder" }
////         ]
////     },
////     "files": ["a.ts"]
//// }

// @Filename: a.ts
//// let x = [1, 2];
//// x/**/
//// 

// Test adding an error message
goTo.marker();
verify.numberOfErrorsInCurrentFile(1);
