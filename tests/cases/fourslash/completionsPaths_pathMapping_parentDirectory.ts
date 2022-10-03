/// <reference path="fourslash.ts" />

// @Filename: /src/a.ts
////import { } from "foo//**/";

// @Filename: /oof/x.ts
////export const x = 0;

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": "src",
////        "paths": {
////            "foo/*": ["../oof/*"]
////        }
////    }
////}

verify.completions({
    marker: "",
    exact: { name: "x", kind: "script", kindModifiers: ".ts" },
    isNewIdentifierLocation: true,
});
