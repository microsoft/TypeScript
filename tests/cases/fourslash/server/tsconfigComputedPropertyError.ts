/// <reference path="../fourslash.ts"/>

// @filename: tsconfig.json
////{
////    ["oops!" + 42]: "true",
////    "compilerOptions": { "lib": ["es5"] },
////    "files": [
////        "nonexistentfile.ts"
////    ],
////    "compileOnSave": true
////}

verify.getSemanticDiagnostics([]);
