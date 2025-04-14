/// <reference path="../fourslash.ts"/>

// @filename: tsconfig.json
////{
////    ["oops!" + 42]: "true",
////    "files": [
////        "nonexistentfile.ts"
////    ],
////    "compileOnSave": true
////}

verify.getSemanticDiagnostics([]);
