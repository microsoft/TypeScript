/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.js
////import * as s from "something";
////fo/*b*/

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
