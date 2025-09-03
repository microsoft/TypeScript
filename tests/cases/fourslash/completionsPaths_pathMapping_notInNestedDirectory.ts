/// <reference path="fourslash.ts" />

// @Filename: /user.ts
////import {} from "something//**/";

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
        "ignoreDeprecations": "6.0",
////        "paths": {
////            "mapping/*": ["whatever"],
////        }
////    }
////}

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });
