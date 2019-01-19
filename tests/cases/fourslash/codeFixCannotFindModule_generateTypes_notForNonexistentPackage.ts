/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import plus = require("plus");
////plus;

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {}
////}

goTo.file("/a.ts");
verify.codeFixAvailable([]);
