/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.ts
////[|export const x = 0;|]
////export const y = 0;

// @Filename: /b.ts
////import * as a from "./a";
////a.x;
////a.y;

// @Filename: /c.ts
////import a = require("./a");
////a.x;
////a.y;

// @Filename: /d.js
////const a = require("./a");
////a.x;
////a.y;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export const y = 0;`,

        "/x.ts":
`export const x = 0;
`,

        "/b.ts":
`import * as a from "./a";
import * as x from "./x";
x.x;
a.y;`,

        "/c.ts":
`import a = require("./a");
import x = require("./x");
x.x;
a.y;`,

        "/d.js":
`const a = require("./a"), x = require("./x");
x.x;
a.y;`,
    },
});
