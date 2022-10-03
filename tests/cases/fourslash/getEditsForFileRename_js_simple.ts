/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////import b from "./b.js";

// @Filename: /b.js
////module.exports = 1;

verify.getEditsForFileRename({
    oldPath: "/b.js",
    newPath: "/c.js",
    newFileContents: {
        "/a.js": `import b from "./c.js";`,
    },
});
