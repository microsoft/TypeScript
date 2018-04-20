/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import old from "./src/old";

// @Filename: /src/a.ts
////import old from "./old";

// @Filename: /src/foo/a.ts
////import old from "../old";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/new.ts",
    newFileContents: {
        "/a.ts": 'import old from "./src/new";',
        "/src/a.ts": 'import old from "./new";',
        "/src/foo/a.ts": 'import old from "../new";',
    },
});
