/// <reference path='fourslash.ts' />

// @Filename: /src/tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": "./old",
////        "paths": {
////            "foo": ["old"],
////        },
////        "rootDir": "old",
////        "rootDirs": ["old"],
////        "typeRoots": ["old"],
////    },
////    "files": ["old/a.ts"],
////    "include": ["old/*.ts"],
////    "exclude": ["old"],
////}

// @Filename: /src/old/someFile.ts
////

verify.getEditsForFileRename({
    oldPath: "/src/old",
    newPath: "/src/new",
    newFileContents: {
        "/src/tsconfig.json":
`{
    "compilerOptions": {
        "baseUrl": "new",
        "paths": {
            "foo": ["new"],
        },
        "rootDir": "new",
        "rootDirs": ["new"],
        "typeRoots": ["new"],
    },
    "files": ["new/a.ts"],
    "include": ["new/*.ts"],
    "exclude": ["new"],
}`,
    },
});
