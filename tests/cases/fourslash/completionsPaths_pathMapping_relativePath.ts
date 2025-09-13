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
////        "resolveJsonModule": false,
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["./*"]
////        }
////    }
////}

verify.completions({
    marker: "",
    exact: ["a", "b"].map(name => ({ name, kind: "script", kindModifiers: ".ts" })),
    isNewIdentifierLocation: true,
});
