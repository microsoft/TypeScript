/// <reference path='fourslash.ts' />

// @Filename: /tsconfig.json
////{
////    "files": ["/src/old/a.ts"],
////    "include": ["/src/old"],
////    "exclude": ["/src/old"],
////    "baseUrl": "/src/old",
////    "typeRoots": ["/src/old"],
////    "mapRoot": ["/src/old"],
////    "rootDir": "/src/old",
////    "rootDirs": ["/src/old"],
////}

verify.getEditsForFileRename({
    oldPath: "/src/old",
    newPath: "/src/new",
    newFileContents: {
        "/tsconfig.json":
`{
    "files": ["/src/new/a.ts"],
    "include": ["/src/new"],
    "exclude": ["/src/new"],
    "baseUrl": "/src/new",
    "typeRoots": ["/src/new"],
    "mapRoot": ["/src/new"],
    "rootDir": "/src/new",
    "rootDirs": ["/src/new"],
}`,
    },
});
