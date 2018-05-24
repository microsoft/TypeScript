/// <reference path='fourslash.ts' />

// @Filename: /src/foo/x.ts
////

// @Filename: /src/foo/new.ts
////import { x } from "./foo/x";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/foo/new.ts",
    newFileContents: {
        "/src/foo/new.ts":
`import { x } from "./x";`,
    },
});
