/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.js
////const a = require("./a");
////fo/**/

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from "./a".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./a";\r
\r
const a = require("./a");
fo`,
});
