/// <reference path="fourslash.ts" />

// @Filename: /x/src/a.ts
////import {} from "[|/**/|]";

// @Filename: /x/tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo/*": ["src/*"]
////        }
////    }
////}

const [replacementSpan] = test.ranges();
verify.completionsAt("", ["src", "foo/"].map(name => ({ name, replacementSpan })));
