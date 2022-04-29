/// <reference path='fourslash.ts' />

// @resolveJsonModule: true

// @Filename: /a.ts
////import text from "./message.json";

// @Filename: /message.json
////{}

verify.getEditsForFileRename({
    oldPath: "/a.ts",
    newPath: "/src/a.ts",
    newFileContents: {
        "/a.ts": 'import text from "../message.json";',
    },
});
