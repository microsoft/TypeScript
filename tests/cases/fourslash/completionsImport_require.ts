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
// Doesn't activate for commonjs-only module
verify.not.completionListContains({ name: "foo", source: "/a" });

goTo.marker("c");
verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("c", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a"`,
    newFileContent: `import { foo } from "./a";

const a = import("./a");
fo`,
});
