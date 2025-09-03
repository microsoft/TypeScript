/// <reference path='fourslash.ts' />

// @Filename: /sub/a.ts
////export const a = 1;

// @Filename: /sub/b.ts
////import { a } from "sub/a";

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
        "ignoreDeprecations": "6.0"
////    }
////}

verify.getEditsForFileRename({
    oldPath: "/sub/b.ts",
    newPath: "/sub/c/d.ts",
    newFileContents: {},
});
