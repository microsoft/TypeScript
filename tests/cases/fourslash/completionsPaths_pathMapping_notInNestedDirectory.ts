/// <reference path="fourslash.ts" />

// @Filename: /user.ts
////import {} from "something//**/";

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "mapping/*": ["whatever"],
////        }
////    }
////}

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });
