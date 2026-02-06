/// <reference path="fourslash.ts" />

// @allowJs: true

// @filename: /a.js
////module.exports = 1;

// @filename: /b.js
////var a = require("./a");
////[|function f() {
////    a;
////}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/b.js": "",

        "/f.js":
`const a = require("./a");

function f() {
    a;
}
`,
    },
});
