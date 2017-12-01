/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.js
////const a = require("./a");
////fo/*b*/

// @Filename: /c.js
////const a = import("./a");
////fo/*c*/

goTo.marker("b");
verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("b", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./a";\r
\r
const a = require("./a");
fo`,
});

goTo.marker("c");
verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("c", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./a";\r
\r
const a = import("./a");
fo`,
});
