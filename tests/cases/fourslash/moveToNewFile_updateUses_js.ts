/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.x = 0;
////[|exports.y = 0;|]

// @Filename: /user.js
////const { x, y } = require("./a");
////

// TODO: GH#23728 Shouldn't need `////` above

verify.moveToNewFile({
    newFileContents: {
        "/a.js":
`exports.x = 0;
`,

        "/y.js":
`exports.y = 0;`,

        "/user.js":
// TODO: GH#22330
`const { x, } = require("./a");
const { y } = require("./y");
`,
    },
});
