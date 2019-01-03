/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const x = 0;

// @Filename: /a.js
////exports.x = 0;

// @Filename: /b.ts
////import { x } from "./a";

verify.getEditsForFileRename({
    oldPath: "/a.ts",
    newPath: "/a2.ts",
    newFileContents: {
        "/b.ts": 'import { x } from "./a2";',
    },
});
