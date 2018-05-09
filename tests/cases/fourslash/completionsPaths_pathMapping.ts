/// <reference path="fourslash.ts" />

// @Filename: /src/b.ts
////export const x = 0;

// @Filename: /src/dir/x.ts
/////export const x = 0;

// @Filename: /src/a.ts
////import {} from "foo//*0*/";
////import {} from "foo/dir//*1*/";

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["src/*"]
////        }
////    }
////}

const [r0, r1] = test.ranges();
verify.completions(
    { marker: "0", exact: ["a", "b", "dir"], isNewIdentifierLocation: true },
    { marker: "1", exact: "x", isNewIdentifierLocation: true },
);
