/// <reference path='fourslash.ts' />

// @moduleResolution: classic

// @Filename: /src/user.ts
////import { x } from "old";

// @Filename: /src/old.ts
////export const x = 0;

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/new.ts",
    newFileContents: {
        "/src/user.ts":
`import { x } from "./new";`,
    },
});
