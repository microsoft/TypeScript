/// <reference path='fourslash.ts' />

// @Filename: /src/tsconfig.json
////{
////    "include": ["dir"],
////}

verify.getEditsForFileRename({
    oldPath: "/src/dir/a.ts",
    newPath: "/src/newDir/b.ts",
    newFileContents: {
        "/src/tsconfig.json":
`{
    "include": ["dir", "newDir/b.ts"],
}`,
    },
});
