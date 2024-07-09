/// <reference path="fourslash.ts" />

// @allowJs: true

// @filename: /a.js
////module.exports = 1;

// @filename: /b.js
////var a = require("./a"),
////    b = require("./a"),
////    c = require("./a");
////[|function f() {
////    b;
////}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/b.js":
`var a = require("./a"),
    c = require("./a");
`,

        "/f.js":
`const b = require("./a");

function f() {
    b;
}
`,
    },
});
