/// <reference path='fourslash.ts' />

// @Filename: /src/tsconfig.json
////{
////    "files": ["old/a.ts"],
////    "include": ["old/*.ts"],
////    "exclude": ["old"],
////    "baseUrl": "old",
////    "typeRoots": ["old"],
////    "mapRoot": ["old"],
////    "rootDir": "old",
////    "rootDirs": ["old"],
////    "paths": {
////        "foo": ["old"],
////    },
////}

verify.getEditsForFileRename({
    oldPath: "/src/old",
    newPath: "/src/new",
    newFileContents: {
        "/src/tsconfig.json":
`{
    "files": ["new/a.ts"],
    "include": ["new/*.ts"],
    "exclude": ["new"],
    "baseUrl": "new",
    "typeRoots": ["new"],
    "mapRoot": ["new"],
    "rootDir": "new",
    "rootDirs": ["new"],
    "paths": {
        "foo": ["new"],
    },
}`,
    },
});
