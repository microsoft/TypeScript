/// <reference path="fourslash.ts" />

// @Filename: /foo.ts
////not read

// @Filename: /x/b.ts
////export const x = 0;

// @Filename: /x/a.ts
////import { } from "foo//**/";

// @Filename: /x/tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["./*"]
////        }
////    }
////}

verify.completionsAt("", ["a", "b"], { isNewIdentifierLocation: true });
