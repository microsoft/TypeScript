/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /src/a.js
////export const a = 0;

// @Filename: /b.js
////import { a } from "./src/a.js";

verify.getEditsForFileRename({
    oldPath: "/b.js",
    newPath: "/src/b.js",
    newFileContents: {
        "/b.js":
`import { a } from "./a.js";`,
    },
});
