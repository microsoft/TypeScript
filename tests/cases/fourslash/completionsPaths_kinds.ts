/// <reference path="fourslash.ts" />

// @Filename: /src/b.ts
////not read

// @Filename: /src/dir/x.ts
////not read

// @Filename: /src/a.ts
////import {} from "./[|/*0*/|]";
////import {} from "./[|/*1*/|]";

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
        "ignoreDeprecations": "6.0",
////        "paths": {
////            "foo/*": ["src/*"]
////        }
////    }
////}

verify.completions({
    marker: ["0", "1"],
    exact: [
        { name: "b", kind: "script", kindModifiers: ".ts" },
        { name: "dir", kind: "directory" },
    ],
    isNewIdentifierLocation: true
});
