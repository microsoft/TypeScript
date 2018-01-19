/// <reference path="fourslash.ts" />

// @Filename: /src/b.ts
////export const x = 0;

// @Filename: /src/dir/x.ts
/////export const x = 0;

// @Filename: /src/a.ts
////import {} from "foo/[|/**/|]";

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["src/*"]
////        }
////    }
////}

const [replacementSpan] = test.ranges();
verify.completionsAt("", [
    { name: "a", replacementSpan },
    { name: "b", replacementSpan },
    { name: "dir", replacementSpan },
]);
