/// <reference path="fourslash.ts" />

// @Filename: /src/b.ts
////export const x = 0;

// @Filename: /src/dir/x.ts
/////export const x = 0;

// @Filename: /src/a.ts
////import {} from "foo/[|/*0*/|]";
////import {} from "foo/dir/[|/*1*/|]";

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
verify.completionsAt("0", ["a", "b", "dir"].map(name => ({ name, replacementSpan: r0 })));
verify.completionsAt("1", ["x"].map(name => ({ name, replacementSpan: r1 })));
