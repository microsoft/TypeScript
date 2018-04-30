/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import i = require("./i");
////import j = require("./j");
////[|const y = i;|]
////j;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import j = require("./j");
j;`,
        "/y.ts":
`import i = require("./i");
const y = i;`,
    },
});
