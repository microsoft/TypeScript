/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.js
////import * as s from "something";
////fo/*b*/

// @Filename: /c.js
////const a = require("./a");
////fo/*c*/

// @Filename: /d.js
////const x = 0;/*d*/

// @Filename: /e.js
////const a = import("./a"); // Does not make this an external module
////fo/*e*/

for (const marker of ["c", "d", "e"]) {
    // Doesn't activate for commonjs-only module, or non-module file unless 'module' is set see also completionsImport_compilerOptionsModule)
    verify.not.completionListContains({ name: "foo", source: "/a" });
}

goTo.marker("b");
verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeCompletionsForModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("b", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a"`,
    newFileContent:
`import * as s from "something";
import { foo } from "./a";
fo`,
});
