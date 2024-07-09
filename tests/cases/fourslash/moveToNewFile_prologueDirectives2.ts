/// <reference path='fourslash.ts' />

// @module: commonjs
// @allowJs: true

// @Filename: /foo.js
////exports.foo = function () {};

// @Filename: /a.js
////"use strict";
////const foo = require("./foo");
////[|function b() {
////    return this;
////}|]
////b();

verify.moveToNewFile({
    newFileContents: {
        "/a.js":
`"use strict";
const { b } = require("./b");
const foo = require("./foo");
b();`,

        "/b.js":
`"use strict";
function b() {
    return this;
}
exports.b = b;
`,
    },
});
