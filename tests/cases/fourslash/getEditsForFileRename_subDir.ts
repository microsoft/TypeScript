/// <reference path='fourslash.ts' />

// @Filename: /src/foo/a.ts
////

// @Filename: /src/old.ts
////import a from "./foo/a";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/dir/new.ts",
    newFileContents: {
        "/src/old.ts":
`import a from "../foo/a";`,
    },
});
