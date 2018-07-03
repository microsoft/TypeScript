/// <reference path='fourslash.ts' />

// @Filename: /src/foo/x.ts
////

// @Filename: /src/old.ts
////import { x } from "./foo/x";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/foo/new.ts",
    newFileContents: {
        "/src/old.ts":
`import { x } from "./x";`,
    },
});
