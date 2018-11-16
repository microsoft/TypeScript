/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const a = 0;

// @Filename: /b.ts
////import { a } from "./A";

verify.getEditsForFileRename({
    oldPath: "/a.ts",
    newPath: "/eh.ts",
    newFileContents: {
        "/b.ts": 'import { a } from "./eh";',
    },
});
