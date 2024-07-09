/// <reference path="fourslash.ts" />

// @Filename: /a.js
////function f(/**/x) {
////}

// @Filename: /jsconfig.json
////{
////    "compilerOptions": {
////        "checkJs": true,
////        "noImplicitAny": true
////    }
////}

goTo.file("/a.js");
verify.errorExistsAfterMarker("");
