/// <reference path="fourslash.ts" />

// @Filename: /x/src/a.ts
////import {} from "/**/";

// @Filename: /x/tsconfig.json
////{
////    "compilerOptions": {
////        "resolveJsonModule": false,
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["src/*"]
////        }
////    }
////}

verify.completions({
    marker: "",
    exact: ["src", "foo"].map(name => ({ name, kind: "directory" })),
    isNewIdentifierLocation: true,
});
