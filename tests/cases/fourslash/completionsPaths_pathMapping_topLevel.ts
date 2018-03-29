/// <reference path="fourslash.ts" />

// @Filename: /x/src/a.ts
////import {} from "/**/";

// @Filename: /x/tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["src/*"]
////        }
////    }
////}

verify.completionsAt("", ["src", "foo/"], { isNewIdentifierLocation: true });
