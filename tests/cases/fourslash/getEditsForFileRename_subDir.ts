/// <reference path='fourslash.ts' />

// @Filename: /src/foo/a.ts
////

// @Filename: /src/dir/new.ts
////import a from "./foo/a";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/dir/new.ts",
    newFileContents: {
        "/src/dir/new.ts":
`import a from "../foo/a";`,
    },
});
