/// <reference path='fourslash.ts' />

// @Filename: /src/tsconfig.json
////{
////    "include": ["dir"],
////}

verify.getEditsForFileRename({
    oldPath: "/src/dir/a.ts",
    newPath: "/src/dir/b.ts",
    newFileContents: {},
});
