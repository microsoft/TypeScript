/// <reference path="fourslash.ts" />

// @module: commonjs
// @moduleResolution: node

// @filename: /node.d.ts
////declare var module: any;
////declare var require: any;

// @filename: /a.ts
////module.exports = 1;

// @filename: /b.ts
////var a = require("./a");
////[|function f() {
////    a;
////}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/b.ts": "",

        "/f.ts":
`var a = require("./a");

function f() {
    a;
}
`,
    },
});
